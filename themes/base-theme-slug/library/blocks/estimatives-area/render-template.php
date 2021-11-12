<?php 
$params = get_query_var('block_params', false);
extract($params['attributes']);
// var_dump($params['attributes']);
?>

<div class="estimatives-area">
    <div class="heading">
        <h3> <?= $headingTitle ?> </h3>
    </div>

    <div class="main-data">
        <h4><?= $preNumberTitle ?></h4>

        <div class="number">
            <span id="trees-estimative" data-base-trees="<?= $baseTrees ?>" data-trees-per-day="<?= $tressPerDay ?>" data-date="<?= $baseDate ?>">loading...</span>
            <span><?= __("estimativa em tempo real", "jaci") ?></span>
        </div>
    </div>


    <div class="base-data">
        <div>
            <h4><?= $averageTitle ?></h4>
            <div class="data">
                <div class="area">
                    <span data-mask="true">
                        <?= $tressPerDay ?>
                    </span>
                    <span>
                        <?= __("árvores/ dia", "jaci") ?>
                    </span>
                </div>

                <div class="area">
                    <span data-mask="true">
                        <?= $hecPerDay ?>
                    </span>
                    <span>
                        <?= __("hectares/ dia", "jaci") ?>
                    </span>
                </div>
            </div>
        </div>
        <div>
            <div class="data">
                <h4><?= $deforestedTitle ?></h4>

                <div class="area">
                    <span data-mask="true">
                        <?= $alerts ?>
                    </span>

                    <span data-mask="true">
                        <?= __("alertas", "jaci") ?>
                    </span>
                
                </div>

                <div class="area">
                    <span data-mask="true">
                        <?= $hectares ?>
                    </span>

                    <span>
                        <?= __("hectares", "jaci") ?>
                    </span>
                </div>
            </div>

        </div>
    </div>

    <div class="final-info">
        <?= $finalInformation ?>
    </div>
</div>