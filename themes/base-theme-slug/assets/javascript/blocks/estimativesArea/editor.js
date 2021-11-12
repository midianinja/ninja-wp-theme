import { DateTimePicker, TextControl, __experimentalNumberControl as NumberControl, ServerSideRender } from '@wordpress/components';
import { RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import './dashboard.scss'
import numberMask from './../../masks/number-masker';

export default ({ attributes, setAttributes }) => {
    const {
        headingTitle = __("Na Amazônia", "jaci"),
        preNumberTitle = __("Árvores derrubadas em 2021", "jaci"),
        averageTitle = __("Média de desmatamento em 2021", "jaci"),
        deforestedTitle = __("Desmatados 2021", "jaci"),
        finalInformation = __("Estimativas detectadas e reportadas. Velocidades médias. | Fonte: MapBiomas. | Última atualização: 08.06.2021", "jaci"),
        baseTrees,
        tressPerDay,
        hecPerDay,
        alerts,
        hectares,
        baseDate } = attributes;

    const updateAttribute = (attribute) => {
        return (attributeValue) => {
            setAttributes({
                ...attributes,
                [attribute]: attributeValue,
            })
        }
    }

    function calculateTreeEstimative(baseTrees, tressPerDay, baseDate ) {
        const startDate = new Date(baseDate);
        const currentDate = new Date(Date.now());
        const secondsBetween = Math.abs((startDate.getTime() - currentDate.getTime()) / 1000);;
        const treesDestroiedInAsec = parseInt(tressPerDay) / 86400;

        // console.log("tressPerDay", tressPerDay, "baseTrees", baseTrees, seconds_between_dates)
        // console.log("in a second", ( treesDestroiedInAsec ))
        // console.log("total of trees in this time", Math.floor(treesDestroiedInAsec * secondsBetween))

        return Math.floor(parseInt(baseTrees) + treesDestroiedInAsec * secondsBetween)
    }

    return (
        <div className="estimatives-area">
            <div className="heading">
                <RichText
                    tagName="h3"
                    className="heading-title"
                    value={headingTitle}
                    onChange={updateAttribute('headingTitle')}
                    placeholder={__('Type the heading text', 'jaci')}
                />
            </div>

            <div className="main-data">
                <RichText
                    tagName="span"
                    className="pre-number-title"
                    value={preNumberTitle}
                    onChange={updateAttribute('preNumberTitle')}
                    placeholder={__('Type the before number title', 'jaci')}
                />

                <div className="number">
                    <span>
                        { numberMask(calculateTreeEstimative(baseTrees? baseTrees : 0, tressPerDay, baseDate)) }
                    </span>
                </div>

                <NumberControl
                    className="base-trees"
                    label={__("Base trees", "jaci")}
                    value={ baseTrees }
                    isShiftStepEnabled={ true }
                    shiftStep={ 1 }
                    onChange={ updateAttribute('baseTrees') }
                />

                { __("Base date", "jaci") }

                <DateTimePicker
                    className="base-date"
                    currentDate={ baseDate }
                    onChange={ updateAttribute('baseDate')  }
                    is12Hour={ true }
                />


            </div>


            <div className="base-data">
                <div>
                    <RichText
                        tagName="span"
                        className="average-title"
                        value={averageTitle}
                        onChange={updateAttribute('averageTitle')}
                        placeholder={__('Type the average title', 'jaci')}
                    />

                    <div className="data">
                        <div className="area">
                            <span>
                                <NumberControl
                                    label={__("Trees per day", "jaci")}
                                    value={ tressPerDay }
                                    onChange={ updateAttribute('tressPerDay') }
                                />
                            </span>
                        </div>

                        <div className="area">
                            <span>
                                <NumberControl
                                    label={__("Hectares per day", "jaci")}
                                    value={ hecPerDay }
                                    onChange={ updateAttribute('hecPerDay') }
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <RichText
                        tagName="span"
                        className="deforested-title"
                        value={deforestedTitle}
                        onChange={updateAttribute('deforestedTitle')}
                        placeholder={__('Type the desforested title', 'jaci')}
                    />

                    <div className="data">
                        <div className="area">
                            <span>
                                <NumberControl
                                    label={__("alerts", "jaci")}
                                    value={ alerts }
                                    onChange={ updateAttribute('alerts') }
                                />
                            </span>

                            <span>
                                {/* { __("alertas", "jaci") } */}
                            </span>
                        
                        </div>

                        <div className="area">
                            <span>
                                <NumberControl
                                    label={__("Hectares", "jaci")}
                                    value={ hectares }
                                    onChange={ updateAttribute('hectares') }
                                />
                            </span>

                            <span>
                                {/* { __("hectares", "jaci") } */}
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="final-info">
                <RichText
                    tagName="span"
                    className="deforested-title"
                    value={finalInformation}
                    onChange={updateAttribute('finalInformation')}
                    placeholder={__('Type the final information', 'jaci')}
                />
            </div>
        </div>
    );
}