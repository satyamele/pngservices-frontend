import React from "react";
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
} from 'antd';
import axios from 'axios';
import {history} from "../App";


const {Option} = Select;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    number: 0
  };

  convert = str => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  handleSubmit = (e, requestType, clientId, catchErrors) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const baseUrl =
        requestType === "post"
          ? `http://127.0.0.1:8000/api/`
          : `http://127.0.0.1:8000/api/${clientId}/`;
      if (!err) {
        const date = String(values.lastservice._d).trim();
        const gender = values.gender.trim();
        const convertedDate = this.convert(date);
        const newValues = {
          ...values,
          lastservice: convertedDate,
          gender: gender
        };
        axios({
          method: requestType,
          url: baseUrl,
          data: newValues,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(function(response) {
            if (response.status === 201 || response.status === 200) {
              history.push("/viewClients");
            }
          })
          .catch(function(error) {
            //handle error
            console.log(error.response);
            if(error.response) {
              catchErrors({ data: error.response.data, status: error.response.status, text: error.statusText });
              return;
            }
            catchErrors({ errorUndefined: undefined});
          });
      }
    });
  };

  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!("value" in this.props)) {
      this.setState({ number });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "91"
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="91">+91</Option>
      </Select>
    );

    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };
    const { requestType, clientId, btnText, catchErrors } = this.props;
    return (
      <>
        <Form
          {...formItemLayout}
          onSubmit={e =>
            this.handleSubmit(e, requestType, clientId, catchErrors)
          }
        >
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input your name"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator("mailid", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Address">
            {getFieldDecorator("address", {
              rules: [
                {
                  required: true,
                  message: "Please input your current address!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Age">
            {getFieldDecorator("age", {
              rules: [
                {
                  required: true,
                  message: "Please input your current address!"
                }
              ]
            })(<Input type="number" />)}
          </Form.Item>
          <Form.Item label="Gender">
            {getFieldDecorator("gender", {
              rules: [{ required: true, message: "Please select your gender!" }]
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.handleSelectChange}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator("contact", {
              rules: [
                {
                  required: true,
                  message: "Please input your phone number!"
                }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </Form.Item>
          <Form.Item label="Investment amount">
            {getFieldDecorator("investment", {
              rules: [
                {
                  required: true,
                  message: "Please input investment amount!"
                }
              ]
            })(
              <Input
                type="number"
                value={this.state.number}
                onChange={this.handleNumberChange}
                style={{ width: "65%", marginRight: "3%" }}
              />
            )}
          </Form.Item>
          <Form.Item label="Last service">
            {getFieldDecorator("lastservice", config)(<DatePicker />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {btnText}
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

export default WrappedRegistrationForm;
