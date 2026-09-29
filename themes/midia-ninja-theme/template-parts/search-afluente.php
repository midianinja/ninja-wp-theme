<?php
/**
 * Busca, contador e ordenação da archive de Afluentes.
 *
 * A busca mantém o parâmetro "pesquisar" (consumido por
 * alterar_consulta_pesquisa_afluente em library/utils.php); a ordenação usa o
 * parâmetro "ordem", com "mais recentes" como padrão e "oldest" para a ordem
 * crescente — mesma convenção do restante do tema (order_search_filters).
 *
 * @package ninja
 */

$total_afluentes = isset( $args['total'] ) ? (int) $args['total'] : 0;
$busca           = isset( $_GET['pesquisar'] ) ? sanitize_text_field( wp_unslash( $_GET['pesquisar'] ) ) : '';
$ordem           = ( isset( $_GET['ordem'] ) && 'oldest' === $_GET['ordem'] ) ? 'oldest' : '';
?>

<form action="" method="get" class="afluentes-controls" role="search">
    <div class="afluentes-search">
        <input
            type="search"
            class="afluentes-search__input"
            name="pesquisar"
            placeholder="<?php esc_attr_e( 'Buscar afluentes...', 'ninja' ); ?>"
            value="<?php echo esc_attr( $busca ); ?>"
            aria-label="<?php esc_attr_e( 'Buscar afluentes', 'ninja' ); ?>"
        >
        <button type="submit" class="afluentes-search__button" aria-label="<?php esc_attr_e( 'Buscar', 'ninja' ); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
        </button>
    </div>

    <span class="afluentes-counter">
        <?php
        echo esc_html(
            sprintf(
                /* translators: %d: número de afluentes. */
                _n( '%d afluente', '%d afluentes', $total_afluentes, 'ninja' ),
                $total_afluentes
            )
        );
        ?>
    </span>

    <label class="afluentes-sort" for="afluentes-ordem">
        <span class="screen-reader-text"><?php esc_html_e( 'Ordenar afluentes', 'ninja' ); ?></span>
        <select class="afluentes-sort__select" id="afluentes-ordem" name="ordem" onchange="this.form.submit()">
            <option value="" <?php selected( $ordem, '' ); ?>><?php esc_html_e( 'Mais recentes', 'ninja' ); ?></option>
            <option value="oldest" <?php selected( $ordem, 'oldest' ); ?>><?php esc_html_e( 'Mais antigos', 'ninja' ); ?></option>
        </select>
    </label>
</form>
