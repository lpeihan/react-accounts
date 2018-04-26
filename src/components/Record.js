import React, { Component } from 'react';
import propTypes from 'prop-types';

import Http from '../utils/axios';

export default class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  async deleteRecord() {
    try {
      await Http.delete(`records/${this.props.record.id}`);
      await this.props.getRecords();
    } catch (e) {
      console.error(e.message);
    }
  }

  async updateRecord() {
    try {
      const record = {
        date: this.refs.date.value,
        title: this.refs.title.value,
        amount: parseInt(this.refs.amount.value, 10)
      };
      await Http.put(`records/${this.props.record.id}`, record);
      this.toggle();
      await this.props.getRecords();
    } catch (e) {
      console.error(e.message);
    }
  }

  toggle() {
    this.setState({
      edit: !this.state.edit
    });
  }

  recordRender() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>
        <td>
          <button className="btn btn-info mr-3" onClick={this.toggle.bind(this)} type="button">edit</button>
          <button className="btn btn-danger" onClick={this.deleteRecord.bind(this)}>delete</button>
        </td>
      </tr>
    );
  }

  recordEditRender() {
    return (
      <tr>
        <td><input type="text" className="form-control" ref="date" defaultValue={this.props.record.date} /></td>
        <td><input type="text" className="form-control" ref="title" defaultValue={this.props.record.title} /></td>
        <td><input type="text" className="form-control" ref="amount" defaultValue={this.props.record.amount} /></td>
        <td>
          <button className="btn btn-info mr-3" onClick={this.updateRecord.bind(this)}>update</button>
          <button className="btn btn-danger" onClick={this.toggle.bind(this)}>cancle</button>
        </td>
      </tr>
    );
  }
  render() {
    if (this.state.edit) {
      return this.recordEditRender();
    } else {
      return this.recordRender();
    }
  }
};

Record.propTypes = {
  record: propTypes.object
};
