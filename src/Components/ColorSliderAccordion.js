import { Collapse, Row, Col } from 'antd';
import React, { Component } from 'react';
import { COLOR_PRESETS_SETTING_CHANGED } from '../Actions/colorSettingsChangeAction';
import { PAGE_TYPES } from '../Actions/pageChangedAction';

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
                <Row>
                    <Col span={26}>
                        <Collapse defaultActiveKey={this.getDefaultActiveKeysFromSliders(sliders[0])}>
                            {this.getPanelsFromSliderArray(sliders[0])}
                        </Collapse >
                    </Col>
                </Row>
            );
        } else {
            const { checkBoxesDisplay, changeTemporarySelectedSetting, temporarySelectedSetting } = this.props;
            accordions = (
                <Row>
                    <Col span={26}>
                        <Collapse activeKey={[temporarySelectedSetting]} onChange={changeTemporarySelectedSetting} accordion>
                            {sliders.map((sliderSet) => {
                                return (
                                    <Panel key={sliderSet[0].props.panelKey} header={sliderSet[0].props.settingsType}>
                                        <Collapse defaultActiveKey={this.getDefaultActiveKeysFromSliders(sliderSet)} >
                                            {this.getPanelsFromSliderArray(sliderSet)}
                                        </Collapse>
                                    </Panel>
                                );
                            })}
                            <Panel header={COLOR_PRESETS_SETTING_CHANGED} key={PAGE_TYPES.COLOR_PRESET_SETTINGS}>
                                {(checkBoxesDisplay) ? checkBoxesDisplay : null}
                            </Panel>
                        </Collapse>
                    </Col>
                </Row >
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