import React, {Component} from 'react'
import {Button} from 'antd';
import {Table, Divider, Tag, Switch} from 'antd';

import gql from '../graphql/gql'

const {Column, ColumnGroup} = Table;

class Overview extends Component {
    state = {
        dataSource: [{
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }]
    };

    componentDidMount() {
        this.searchTable();
    }

    searchTable() {
        const query = `
            query{
              getTables{
                tableNumber
                tableId
                people
                status
              }
            }
        `;
        gql({query}).then(res => {
            const data = res.data;
            const query = data.data.getTables;
            this.setState({dataSource: query})
        }).catch(e => {
            console.log(e);
        })
    }

    addTable() {
        const query = `
        mutation{
          addTable{
            tableNumber
            tableId
            status
          }
        }
        `;
        gql({query})
            .then(res => {
                const data = res.data;
                this.searchTable();
            })
            .catch(e => {

            })
    }

    changeTableStatus(status,record){
        const {tableId} = record;
        status = status?0:1;
        const query = `
        mutation{
          changeTableStatus(input:{
            status:${status},
            tableId:"${tableId}"
          }){
            tableNumber
            tableId
            status
          }
        }
        `;
        gql({query})
            .then(res => {
                this.searchTable();
            })
            .catch(e => {

            })
    }

    render() {
        const {dataSource} = this.state;
        return (
            <div style={{textAlign: "left"}}>
                <Button onClick={e => this.addTable()} size="default">添加</Button>
                <Table style={{marginTop: "10px"}} dataSource={dataSource}>
                    <Column
                        title="桌子号"
                        dataIndex="tableNumber"
                        key="tableNumber"
                    />
                    <Column
                        title="人数"
                        dataIndex="people"
                        key="people"
                    />
                    <Column
                        title="状态"
                        dataIndex="status"
                        key="status"
                        render={(text, record) => {
                            return (<Switch checkedChildren="空闲" checked={text==0} onClick={status=>this.changeTableStatus(status,record)} unCheckedChildren="用餐"/>)
                        }}
                    />
                    <Column
                        title="操作"
                        key="action"
                        render={(text, record) => (
                            <span>
                              <a href="javascript:;">修改</a>
                              <Divider type="vertical"/>
                              <a href="javascript:;">删除</a>
                            </span>
                        )}
                    />
                </Table>
            </div>
        )
    }
}

export default Overview
