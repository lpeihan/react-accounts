import React, { Component } from 'react';
import Record from './Record';
import RecordCreate from './RecordCreate';
import AmountBox from './AmountBox';
import Http from '../utils/axios';

export default class Records extends Component {
  constructor() {
    super();
    this.state = {
      records: []
    };
  }

  async getRecords() {
    try {
      const records = await Http.get('records');

      this.setState({
        records: records.data
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  caclCredit() {
    let total = 0;
    this.state.records.forEach((record) => {
      if (record.amount >= 0) {
        total += record.amount;
      }
    });
    return total;
  }

  caclDebit() {
    let total = 0;
    this.state.records.forEach((record) => {
      if (record.amount < 0) {
        total += record.amount;
      }
    });
    return total;
  }

  componentDidMount() {
    this.getRecords();
  }
  render() {
    return (
      <div className="container">
        <h2 className="text-center mb-3">Records</h2>

        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.caclCredit()}/>
          <AmountBox text="Debit" type="danger" amount={this.caclDebit()} />
          <AmountBox text="Balance" type="info" amount={this.caclCredit() + this.caclDebit()}/>
        </div>

        <RecordCreate getRecords={this.getRecords.bind(this)} />

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(record =>
              <Record key={record.id} record={record} getRecords={this.getRecords.bind(this)}/>)}
          </tbody>
        </table>
      </div>
    );
  }
};
