<?php

namespace Ninja;

function flickr_gallery_callback( $attributes ) {
    $custom_class    = isset( $attributes['className'] ) ? sanitize_title( $attributes['className'] ) : '';

    $block_classes[] = 'flickr-gallery-block';
    $block_classes[] = $custom_class;

    $block_classes = array_filter( $block_classes );

	$api_key = flickr_get_api_key();

	$flickr_by_type = ( isset( $attributes['flickrByType'] ) && ! empty( $attributes['flickrByType'] ) ) ? esc_attr( $attributes['flickrByType'] ) : 'user';

	if ( $flickr_by_type === 'album' ) {
		$data_id = ( isset( $attributes['flickrAlbumId'] ) && ! empty( $attributes['flickrAlbumId'] ) ) ? esc_attr( $attributes['flickrAlbumId'] ) : false;
	} elseif ( $flickr_by_type === 'collection' ) {
		$data_id = ! empty( $attributes['flickrCollectionId'] ) ? esc_attr( $attributes['flickrCollectionId'] ) : false;
	} else {
		$data_id = ( isset( $attributes['flickrUserId'] ) && ! empty( $attributes['flickrUserId'] ) ) ? esc_attr( $attributes['flickrUserId'] ) : false;
	}

	if ( ! $api_key || ! $data_id ) {
		if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return '<h2>' . __( 'Check the API Key, user, collection or album ID', 'ninja' ) . '</h2>';
		}

		return;
	}

	if ( $flickr_by_type === 'albums' ) {
		$data = flickr_get_albums( $api_key, $data_id, 9, 1 );
	} elseif ( $flickr_by_type === 'collection' ) {
		$user_id       = ! empty( $attributes['flickrUserId'] ) ? esc_attr( $attributes['flickrUserId'] ) : false;
		$collection_id = ! empty( $attributes['flickrCollectionId'] ) ? esc_attr( $attributes['flickrCollectionId'] ) : false;
		$data          = flickr_get_collections( $user_id, $collection_id );

		if ( ! empty( $data['data'] ) ) {
			foreach ( $data['data'] as &$collection ) {
				if ( ! empty( $collection['set'] ) && is_array( $collection['set'] ) ) {
					foreach ( $collection['set'] as &$set ) {
						$set_id = (string) ( $set['id'] ?? '' );
						$set['thumb_url'] = $set_id !== ''
							? flickr_get_photoset_thumb_url( $set_id, $user_id )
							: null;
					}
				}
			}
			unset( $collection, $set );
		}
	} else {
		$data = flickr_get_photos( $api_key, $flickr_by_type, $data_id, 9, 1 );
	}

    if ( empty( $data ) ) {
        if ( is_admin() || defined( 'REST_REQUEST' ) && REST_REQUEST ) {
            return '<h2>'. __( 'No content found', 'ninja' ). '</h2>';
        }

        return;
    }

    ob_start();
	?>

    <div id="block__<?= esc_attr( $attributes['blockId'] ) ?>" class="<?= implode( ' ', $block_classes ) ?>">
        <div class="container">
            <div class="flickr-gallery-block__content">
				<div class="flickr-gallery-block__before-grid"></div>

				<div class="flickr-gallery-block__grid" data-key="<?= flickr_encrypt_key( $api_key ) ?>" data-type="<?= $flickr_by_type ?>" data-id="<?= $data_id ?>">
				<?php if ( $flickr_by_type === 'albums' ):
					foreach( $data['data'] as $album ):
						get_template_part( 'library/blocks/src/flickr-gallery/template-parts/album', null, [ 'album' => $album ] );
					endforeach;
				elseif ( $flickr_by_type === 'collection' ):
					foreach( $data['data'][0]['set'] as $collection ):
						get_template_part( 'library/blocks/src/flickr-gallery/template-parts/collection', null, [ 'collection' => $collection, 'user_id' => $user_id ] );
					endforeach;
				else:
					foreach( $data['data'] as $photo ):
						get_template_part( 'library/blocks/src/flickr-gallery/template-parts/photo', null, [ 'photo' => $photo ] );
					endforeach;
				endif; ?>
				</div>

				<div class="flickr-gallery-block__pagination" data-pages="<?= $data['pages'] ?>"></div>
            </div><!-- .flickr-gallery-block__content -->
        </div>
    </div><!-- .flickr-gallery-block -->

	<?php
    $output = ob_get_clean();
    return $output;
}
