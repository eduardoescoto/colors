import { Collapse } from 'antd';
import React, { Component } from 'react';

const Panel = Collapse.Panel;

class ColorSliderAccordion extends Component {
    getPanelsFromSliderArray = (sliders) => {
        const panelArray = sliders.map((slider) => {
            return (<Panel key={slider.props.settingName} header={slider.props.sliderName}>{slider}</Panel>);
        });
        return panelArray;
    }
    getDefaultActiveKeysFromSliders = (sliders) => {
        const activeKeyArray = sliders.map((slider) => {
            return `${slider.props.settingName}`;
        });
        return activeKeyArray;
    }
    getAccordionsFromSliderArray = (sliders) => {
        let accordions;
        if (sliders.length === 1) {
            accordions = (
                <Collapse defaultActiveKey={this.getDefaultActiveKeysFromSliders(sliders[0])}>
                    {this.getPanelsFromSliderArray(sliders[0])}
                </Collapse >
            );
        } else {
            const { checkBoxes } = this.props;
            const checkBoxesDisplay = (<Panel header="Color Preset Settings">{this.props.checkBoxes}</Panel>);
            accordions = (
                <Collapse defaultActiveKey={sliders[0][0].props.settingsType} accordion>
                    {sliders.map((sliderSet) => {
                        return (
                            <Panel key={sliderSet[0].props.settingsType} header={sliderSet[0].props.settingsType}>
                                <Collapse defaultActiveKey={this.getDefaultActiveKeysFromSliders(sliderSet)} >
                                    {this.getPanelsFromSliderArray(sliderSet)}
                                </Collapse>
                            </Panel>
                        );
                    })}
                    {(checkBoxes) ? checkBoxesDisplay : null}
                </Collapse>
            );
        }
        return accordions;
    }
    render() {
        const { sliders } = this.props;
        const accordion = this.getAccordionsFromSliderArray(sliders);
        return (accordion);
    }
}

export default ColorSliderAccordion;