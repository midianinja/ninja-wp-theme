<?php

namespace jaci;

class Assets
{
    private static $instances = [];
    protected $google_fonts;
    protected $js_files;
    protected $css_files;

    protected function __construct()
    {
        $this->initialize();
    }

    public static function getInstance()
    {
        $cls = static::class;
        if (!isset(self::$instances[$cls])) {
            self::$instances[$cls] = new static();
        }

        return self::$instances[$cls];
    }

    /**
     * Adds the action and filter hooks to integrate with WordPress.
     */
    public function initialize()
    {
        add_action('wp_enqueue_scripts', [ $this, 'enqueue_local_fonts' ]);
        add_action('admin_enqueue_scripts', [ $this, 'enqueue_local_fonts' ]);
        $this->enqueue_styles();
        add_action('wp_enqueue_scripts', [ $this, 'enqueue_javascripts' ]);
        add_action('enqueue_block_assets', [ $this, 'gutenberg_block_enqueues' ]);
        add_action('admin_enqueue_scripts', [ $this, 'enqueue_admin_style' ]);
        add_action('enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ]);
        add_action('after_setup_theme', [ $this, 'action_add_editor_styles' ]);
        add_filter('wp_resource_hints', [ $this, 'filter_resource_hints' ], 10, 2);
        add_filter('style_loader_tag', [ $this, 'add_rel_preload' ], 10, 4);

        // add_action( 'wp_head', [ $this, 'action_preload_styles' ] );
    }

    /**
     * Registers or enqueues stylesheets.
     *
     * Stylesheets that are global are enqueued. All other stylesheets are only registered, to be enqueued later.
     */
    public function enqueue_styles()
    {
        add_action('wp_head', [ $this, 'enqueue_inline_styles' ], 99);
        add_action('wp_enqueue_scripts', [ $this, 'enqueue_generic_styles' ]);
    }

    /**
     * Enqueues a local font stylesheet in the theme.
     *
     * @see wp_enqueue_style() for more information on enqueuing stylesheets in WordPress.
     */
    public function enqueue_local_fonts()
    {
        wp_enqueue_style('ninja-fonts', get_template_directory_uri() . '/assets/fonts/fonts.css', [], null);
    }

    public function add_rel_preload($html, $handle, $href, $media)
    {
        if (!WP_DEBUG && (is_admin() || is_user_logged_in())) {
            return $html;
        }

        $html = "<link rel='stylesheet' onload=\"this.onload=null;this.media='all'\" id='$handle' href='$href' type='text/css' media='print' />";
        return $html;
    }

    public function enqueue_inline_styles()
    {
        $preloading_styles_enabled = false;
        $css_uri = get_stylesheet_directory() . '/dist/css/';

        $css_files = $this->get_css_files();
        foreach ($css_files as $handle => $data) {
            $src = $css_uri . $data['file'];
            $content = file_get_contents($src);

            if ($data['global'] || ! $preloading_styles_enabled && is_callable($data['preload_callback']) && call_user_func($data['preload_callback']) && isset($data['inline']) && $data['inline']) {
                echo "<style id='$handle-css'>" . $content . "</style>";
            }
        }
    }

    public function enqueue_generic_styles()
    {
        // Enqueue Google Fonts.
        $google_fonts_url = $this->get_google_fonts_url();
        if (! empty($google_fonts_url)) {
            wp_enqueue_style('jaci-fonts', $google_fonts_url, [], null);
        }

        $css_uri = get_theme_file_uri('/dist/css/');
        $css_dir = get_theme_file_path('/dist/css/');

        // ToDo: Create custom preloading for each enqueue
        $preloading_styles_enabled = false;

        $css_files = $this->get_css_files();
        foreach ($css_files as $handle => $data) {
            // Skip inline styles
            if(isset($data['inline']) && $data['inline']) {
                continue;
            }

            $src = $css_uri . $data['file'];
            $version = (string) filemtime($css_dir . $data['file']);

            /**
             * Depends
             *
             * @see https://developer.wordpress.org/reference/functions/wp_enqueue_style/
             */
            $deps = [];
            if (isset($data['deps']) && ! empty($data['deps'])) {
                $deps = $data['deps'];
            }

            /*
            * Enqueue global stylesheets immediately and register the other ones for later use
            * (unless preloading stylesheets is disabled, in which case stylesheets should be immediately
            * enqueued based on whether they are necessary for the page content).
            */
            if ($data['global'] || ! $preloading_styles_enabled && is_callable($data['preload_callback']) && call_user_func($data['preload_callback'])) {
                wp_enqueue_style($handle, $src, $deps, $version, $data['media']);
            } else {
                wp_register_style($handle, $src, $deps, $version, $data['media']);
            }

            wp_style_add_data($handle, 'precache', true);
        }
    }

    public function enqueue_javascripts()
    {
        $js_uri = get_theme_file_uri('/dist/js/functionalities/');
        $js_dir = get_theme_file_path('/dist/js/functionalities/');

        // ToDo: Create custom preloading for each enqueue
        $preloading_styles_enabled = false;

        $js_files = $this->get_js_files();

        foreach ($js_files as $handle => $data) {
            $src = $js_uri . $data['file'];
            $version = (string) filemtime($js_dir . $data['file']);

            $deps = [];
            if (isset($data['deps']) && ! empty($data['deps'])) {
                $deps = $data['deps'];
            }

            if ($data['global'] || ! $preloading_styles_enabled && is_callable($data['preload_callback']) && call_user_func($data['preload_callback'])) {
                wp_enqueue_script($handle, $src, $deps, $version, true);
            }
        }
    }

    /**
     * Register and enqueue a custom stylesheet in the WordPress admin.
     */
    public function enqueue_admin_style($hook)
    {
        $css_uri = get_theme_file_uri('/dist/css/');
        $css_dir = get_theme_file_path('/dist/css/');

        wp_enqueue_style('midia-ninja-editor', $css_uri . '_p-editor.css');
        // wp_enqueue_script(
        //     'buddyx-admin-script',
        //     get_theme_file_uri( '/assets/js/buddyx-admin.min.js' ),
        //     '',
        //     '',
        //     true
        // );
    }

    /**
     * Enqueue custom assets on admin after default asstes blocks
     *
     * @link https://developer.wordpress.org/reference/hooks/enqueue_block_editor_assets/
     */
    public function enqueue_block_editor_assets()
    {

        // Cover
        wp_enqueue_style(
            'custom-core-cover',
            get_stylesheet_directory_uri() . '/dist/css/_b-cover.css',
            [],
            filemtime(get_stylesheet_directory() . '/dist/css/_b-cover.css'),
            'all'
        );

    }

    /**
     * Preloads in-body stylesheets depending on what templates are being used.
     *
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
     */
    public function action_preload_styles()
    {
        $wp_styles = wp_styles();

        $css_files = $this->get_css_files();
        foreach ($css_files as $handle => $data) {

            // Skip if stylesheet not registered.
            if (! isset($wp_styles->registered[ $handle ])) {
                continue;
            }

            // Skip if no preload callback provided.
            if (! is_callable($data['preload_callback'])) {
                continue;
            }

            // Skip if preloading is not necessary for this request.
            if (! call_user_func($data['preload_callback'])) {
                continue;
            }

            $preload_uri = $wp_styles->registered[ $handle ]->src . '?ver=' . $wp_styles->registered[ $handle ]->ver;

            echo '<link rel="preload" id="' . esc_attr($handle) . '-preload" href="' . esc_url($preload_uri) . '" as="style">';
            echo "\n";
        }
    }

    /**
     * Enqueues WordPress theme styles for the editor.
     */
    public function action_add_editor_styles()
    {

        // Enqueue Google Fonts.
        $google_fonts_url = $this->get_google_fonts_url();
        if (! empty($google_fonts_url)) {
            add_editor_style($this->get_google_fonts_url());
        }

        // Enqueue block editor stylesheet.
        add_editor_style('assets/css/editor/editor-styles.min.css');
    }

    /**
     * Adds preconnect resource hint for Google Fonts.
     *
     * @param array  $urls          URLs to print for resource hints.
     * @param string $relation_type The relation type the URLs are printed.
     * @return array URLs to print for resource hints.
     */
    public function filter_resource_hints(array $urls, string $relation_type): array
    {
        if ('preconnect' === $relation_type && wp_style_is('buddyx-fonts', 'queue')) {
            $urls[] = [
                'href' => 'https://fonts.gstatic.com',
                'crossorigin',
            ];
        }

        return $urls;
    }

    /**
     * Prints stylesheet link tags directly.
     *
     * This should be used for stylesheets that aren't global and thus should only be loaded if the HTML markup
     * they are responsible for is actually present. Template parts should use this method when the related markup
     * requires a specific stylesheet to be loaded. If preloading stylesheets is disabled, this method will not do
     * anything.
     *
     * If the `<link>` tag for a given stylesheet has already been printed, it will be skipped.
     *
     * @param string ...$handles One or more stylesheet handles.
     */
    public function print_styles(string ...$handles)
    {
        $css_files = $this->get_css_files();
        $handles   = array_filter(
            $handles,
            function ($handle) use ($css_files) {
                $is_valid = isset($css_files[ $handle ]) && ! $css_files[ $handle ]['global'];
                if (! $is_valid) {
                    /* translators: %s: stylesheet handle */
                    _doing_it_wrong(__CLASS__ . '::print_styles()', esc_html(sprintf(__('Invalid theme stylesheet handle: %s', 'buddyx'), $handle)), 'Buddyx 2.0.0');
                }
                return $is_valid;
            }
        );

        if (empty($handles)) {
            return;
        }

        wp_print_styles($handles);
    }

    /**
     * Gets all CSS files.
     *
     * @return array Associative array of $handle => $data pairs.
     */
    protected function get_css_files(): array
    {
        if (is_array($this->css_files)) {
            return $this->css_files;
        }

        $css_files = [
            'critical'     => [
                'file' => 'critical.css',
                'global' => true,
                'inline' => true,
            ],

            'home' => [
                'file' => '_p-home.css',
                'preload_callback' => function () {
                    return is_front_page();
                },
            ],

            'page' => [
                'file' => '_p-page.css',
                'preload_callback' => function () {
                    return ! is_front_page() && is_page();
                },
            ],

			'page-fale-conosco' => [
				'file' => '_p-page-fale-conosco.css',
				'preload_callback' => function() {
					return ! is_front_page() && is_page();
				},
			],

            'single' => [
                'file' => '_p-single.css',
                'preload_callback' => function () {
                    return is_single();
                },
            ],

            '404' => [
                'file' => '_p-404.css',
                'preload_callback' => function () {
                    return is_404();
                },
            ],

            'archive' => [
                'file' => '_p-archive.css',
                'preload_callback' => function () {
                    return is_archive();
                },
            ],

            'archive-opiniao' => [
                'file' => '_p-archive-opiniao.css',
                'preload_callback' => function () {
                    return is_post_type_archive('opiniao');
                },
            ],
            'archive-afluente' => [
                'file' => '_p-archive-afluente.css',
                'preload_callback' => function () {
                    return is_post_type_archive('afluente');
                },
            ],

            'search' => [
                'file' => '_p-search.css',
                'preload_callback' => function () {
                    return is_search();
                },
            ],
            'author' => [
                'file' => '_p-author.css',
                'preload_callback' => function () {
                    return is_author();
                },
            ],
            'anchor' => [
                'file' => '_p-page-anchor.css',
                'preload_callback' => function () {
                    return is_page_template('page-anchor.php');
                },
            ],

            // Tutor
            'tutorstarter' => [
                'file' => '_p-tutorstarter.css',
                'preload_callback' => function () {
                    return is_plugin_active('tutor/tutor.php');
                },
            ]
        ];

        /**
         * Filters default CSS files.
         *
         * @param array $css_files Associative array of CSS files, as $handle => $data pairs.
         * $data must be an array with keys 'file' (file path relative to 'assets/css'
         * directory), and optionally 'global' (whether the file should immediately be
         * enqueued instead of just being registered) and 'preload_callback' (callback)
         * function determining whether the file should be preloaded for the current request).
         */
        $css_files = apply_filters('css_files_before_output', $css_files);


        $this->css_files = [];
        foreach ($css_files as $handle => $data) {
            if (is_string($data)) {
                $data = [ 'file' => $data ];
            }

            if (empty($data['file'])) {
                continue;
            }

            $this->css_files[ $handle ] = array_merge(
                [
                    'global'           => false,
                    'preload_callback' => null,
                    'media'            => 'all',
                ],
                $data
            );
        }

        return $this->css_files;
    }


    /**
     * Gets all JS files.
     *
     * @return array Associative array of $handle => $data pairs.
     */
    protected function get_js_files(): array
    {
        if (is_array($this->js_files)) {
            return $this->js_files;
        }

        $js_files = [
            'menu'     => [
                'file' => 'menu.js',
                'global' => true,
            ],

            // Tutor
            'tutorstarter'     => [
                'file' => 'tutorstarter.js',
                'global' => true,
            ],

            'scroll-behavior'     => [
                'file' => 'anchor-behavior.js',
                'global' => true,
            ],

            'search' => [
                'file'   => 'search.js',
                'global' => true,
            ],

            'filter' => [
                'file'   => 'perguntas-frequentes.js',
                'preload_callback' => function () {
                    return (is_post_type_archive('perguntas_frequentes') || is_singular('perguntas_frequentes')) ? true : false;
                }
            ],

            'copy-url' => [
                'file' => 'copy-url.js',
                'global' => true,
            ],

            'anchor-sidebar'     => [
                'file' => 'anchor-sidebar.js',
                'preload_callback' => function () {
                    return is_page_template('page-anchor.php');
                }
            ],

            'archive-opiniao' => [
                'file'   => 'archive-opiniao.js',
                'preload_callback' => function () {
                    return is_post_type_archive('opiniao');
                }
            ],
			'seja-ninja' => [
				'file'   => 'seja-ninja.js',
				'global' => true,
			],

        ];

        $js_files = apply_filters('js_files_before_output', $js_files);

        $this->js_files = [];
        foreach ($js_files as $handle => $data) {
            if (is_string($data)) {
                $data = [ 'file' => $data ];
            }

            if (empty($data['file'])) {
                continue;
            }

            $this->js_files[ $handle ] = array_merge(
                [
                    'global'           => false,
                    'preload_callback' => null,
                ],
                $data
            );
        }

        return $this->js_files;
    }

    /**
     * Returns Google Fonts used in theme.
     *
     * @return array Associative array of $font_name => $font_variants pairs.
     */
    protected function get_google_fonts(): array
    {
        if (is_array($this->google_fonts)) {
            return $this->google_fonts;
        }

        $google_fonts = [
            'Archivo' => [ '400', '500', '600', '700', '800' ],
            'Manrope' => [ '400', '500', '600', '700', '800' ]
        ];

        /**
         * Filters default Google Fonts.
         *
         * @param array $google_fonts Associative array of $font_name => $font_variants pairs.
         */
        $this->google_fonts = (array) apply_filters('buddyx_google_fonts', $google_fonts);

        return $this->google_fonts;
    }

    /**
     * Returns the Google Fonts URL to use for enqueuing Google Fonts CSS.
     *
     * Uses `latin` subset by default. To use other subsets, add a `subset` key to $query_args and the desired value.
     *
     * @return string Google Fonts URL, or empty string if no Google Fonts should be used.
     */
    protected function get_google_fonts_url(): string
    {
        $google_fonts = $this->get_google_fonts();

        if (empty($google_fonts)) {
            return '';
        }

        $font_families = [];

        foreach ($google_fonts as $font_name => $font_variants) {
            if (! empty($font_variants)) {
                if (! is_array($font_variants)) {
                    $font_variants = explode(';', str_replace(' ', '', $font_variants));
                }

                $font_families[] = $font_name . ':wght@' . implode(';', $font_variants);
                continue;
            }

            $font_families[] = $font_name;
        }

        $query_args = [
            'family'  => implode('&family=', $font_families),
            'display' => 'swap',
        ];

        return add_query_arg($query_args, 'https://fonts.googleapis.com/css2');
    }

    public function gutenberg_block_enqueues()
    {
        $id = get_the_ID();

        $block_list = [
            'ninja/latest-vertical-posts' => function () {
                $this->format_enqueue_css('ninja-latest-vertical-posts', '_b-latest-vertical-posts.css');
            },

            'core/query' => function () {
                wp_enqueue_style(
                    'tiny-slider',
                    get_stylesheet_directory_uri() . '/assets/vendor/tiny-slider/tiny-slider.css',
                    [],
                    filemtime(get_stylesheet_directory() . '/assets/vendor/tiny-slider/tiny-slider.css'),
                    'all'
                );

                wp_enqueue_style(
                    'core-query',
                    get_stylesheet_directory_uri() . '/dist/css/_b-query.css',
                    [],
                    filemtime(get_stylesheet_directory() . '/dist/css/_b-query.css'),
                    'all'
                );

                wp_enqueue_script(
                    'tiny-slider',
                    get_stylesheet_directory_uri() . '/assets/vendor/tiny-slider/tiny-slider.js',
                    [],
                    '2.9.3',
                    true
                );

                wp_enqueue_script(
                    'query-slider',
                    get_stylesheet_directory_uri() . '/dist/js/functionalities/query-slider.js',
                    ['tiny-slider'],
                    filemtime(get_stylesheet_directory() . '/dist/js/functionalities/query-slider.js'),
                    true
                );
            }
        ];

        // Enqueue only used blocks
        foreach ($block_list as $key => $block) {
            if (has_block($key, $id)) {
                $block();
            }
        }
    }

    public function format_enqueue_css($handle, $file_name, $deps = [], $media = 'all')
    {
        $css_file_path = get_stylesheet_directory() . '/dist/css/' . $file_name;
        $css_version = file_exists($css_file_path) ? filemtime($css_file_path) : false;

        if ($css_version) {
            wp_enqueue_style(
                $handle,
                get_stylesheet_directory_uri() . '/dist/css/' . $file_name,
                $deps,
                $css_version,
                $media
            );
        }
    }
}


$assets_manager = Assets::getInstance();
