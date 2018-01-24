import React from 'react'
import {Form, Input, Button, Row, Col, Icon } from 'antd'
import PropTypes from 'prop-types'
import {autobind} from 'core-decorators'
import {mapPropsToFields} from 'utils/form'
import SelectStationType from 'components/elements/select-station-type'
import createLanguageHoc,{langPropTypes} from "../../../../hoc/create-lang";

const FormItem = Form.Item

@Form.create({
    mapPropsToFields: mapPropsToFields
})
@createLanguageHoc
@autobind
export default class StationAutoSearchForm extends React.PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func,
        initialValues: PropTypes.object,
        onChangeSearch: PropTypes.func,
        lang: langPropTypes
    }

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentWillMount() {

    }
    changeSearch(e){
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err) return
            const data = {}
            if (values.address) data.address=values.address
            if (values.name) data.name=values.name
            if (values.stationType) data.stationType=values.stationType
            // Callback submit form Container Component
            this.setState({ dataSearch: data},() => this.props.onChangeSearch(data))
        })
    }
    changeStationType(stationType){

    }

    render() {
        const {getFieldDecorator} = this.props.form
        const { t } = this.props.lang
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.changeSearch}
            >
                <Row gutter={24}>
                    <Col span={7} key="name">
                        <FormItem label={t("stationAutoManager.form.name.label")}>
                            {getFieldDecorator(`name`)(
                                <Input placeholder={t("stationAutoManager.form.name.placeholder")}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={7} key="address">
                        <FormItem label={t("stationAutoManager.form.address.label")}>
                            {getFieldDecorator(`address`)(
                                <Input placeholder={t("stationAutoManager.form.address.placeholder")}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={7} key="stationType">
                        <SelectStationType getFieldDecorator={getFieldDecorator} label={t("stationAutoManager.form.stationType.label")} onChangeStationType={this.changeStationType}/>
                    </Col>
                    <Col span={3} style={{textAlign: 'right', marginTop: '42px'}}>
                        <Button type="primary" htmlType="submit"><Icon type="search"></Icon>{t("addon.search")}</Button>
                    </Col>
                </Row>
                <Row>

                </Row>
            </Form>
        )
    }
}
