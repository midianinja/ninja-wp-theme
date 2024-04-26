<form action="" method="GET" class="advanced-search">
    <h2>Buscar por:</h2>
    <div class="input-search">
        <input type="text" placeholder="Afluentes..." name="pesquisar" value="<?= isset($_GET['pesquisar']) ? $_GET['pesquisar'] : '' ?>">
        <button type="submit">
            <img src="<?php echo get_template_directory_uri() . '/assets/images/generic.png'; ?>" alt="Search Icon">
        </button>
    </div>
</form>