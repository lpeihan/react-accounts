import React, { Component } from 'react';
import Http from '../utils/axios';

export default class RecordCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {
        date: '',
        title: '',
        amount: ''
      }
    };
  }

  change(event) {
    let name, obj;
    name = event.target.name;
    this.setState({
      record: Object.assign(
        this.state.record,
        (obj = {}, obj[name] = event.target.value, obj)
      )
    });
  }

  async createRecord(event) {
    try {
      event.preventDefault();
      const record = {
        date: this.state.record.date,
        title: this.state.record.title,
        amount: parseInt(this.state.record.amount, 10)
      };

      await Http.post('records', record);
      await this.props.getRecords();

      this.setState({
        record: {
          date: '',
          title: '',
          amount: ''
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  valid() {
    return this.state.record.date && this.state.record.title && this.state.record.amount;
  }

  render() {
    return (
      <form className="form-inline mb-3" onSubmit={this.createRecord.bind(this)}>
        <div className="form-group mr-3">
          <input type="text" className="form-control" placeholder="date" name="date"
            onChange={this.change.bind(this)} value={this.state.record.date}/>
        </div>
        <div className="form-group mr-3">
          <input type="text" className="form-control" placeholder="title" name="title"
            onChange={this.change.bind(this)} value={this.state.record.title} />
        </div>
        <div className="form-group mr-3">
          <input type="text" className="form-control" placeholder="amount" name="amount"
            onChange={this.change.bind(this)} value={this.state.record.amount} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={!this.valid()}>create record</button>
      </form>
    );
  }
};
