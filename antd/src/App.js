import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Layout, Menu, Icon} from 'antd';
import './App.css';

import Overview from './components/Overview'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const {
    Header, Content, Footer, Sider,
} = Layout;


class AdminLayout extends Component{
    renderSubMenu(menuInfo) {
        return (
            <SubMenu title={<span><Icon type={menuInfo.type}/><span>{menuInfo.text}</span></span>}
                     key={menuInfo.path}>
                {menuInfo.children.map((menuInfo, index) => (
                    this.renderOnlyMenu(menuInfo, index)
                ))}
            </SubMenu>
        )
    }

    renderOnlyMenu(menuInfo) {
        return (
            <Menu.Item style={{textAlign: "left"}} key={menuInfo.path}>
                <Link to={menuInfo.path}>
                    <Icon type={menuInfo.type}/>
                    <span className="nav-text">{menuInfo.text}</span>
                </Link>
            </Menu.Item>
        )
    }

    renderMenu() {
        const {menu} = this.state;
        return (
            menu.map((menuInfo, index) => {
                const hasChildren = menuInfo.children && menuInfo.children.length;
                return (
                    hasChildren ? this.renderSubMenu(menuInfo, index) : this.renderOnlyMenu(menuInfo, index)
                )
            })
        )
    }

    state = {
        menu: [
            {
                text: "餐桌管理", type: "code", path: "/table", children: [
                    {text: "餐桌概况", type: "desktop", path: "/overview"},
                    {text: "餐桌查询", type: "search", path: "/search"},
                ]
            },
            {
                text: "订单管理", type: "folder", path: "/order", children: []
            },
            {text: "菜品管理", type: "appstore", path: "/dish", children: []},
        ]
    };
    render() {

        return (
            <Layout>
                <Sider style={{
                    overflow: 'auto', height: '100vh', position: 'fixed', left: 0, textAlign: "left"
                }}
                >
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultOpenKeys={['/table']} defaultSelectedKeys={[window.location.pathname]}>
                        {this.renderMenu()}
                    </Menu>
                </Sider>
                <Layout style={{marginLeft: 200}}>
                    <Content style={{margin: '24px 16px',height:"100%", overflow: 'initial'}}>
                        <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
                            <Route path="/" exact component={()=><div>index</div>}/>
                            <Route path="/overview" exact component={Overview}/>
                            <Route path="/search" exact component={()=><div>search</div>}/>
                            <Route path="/order" exact component={()=><div>order</div>}/>
                            <Route path="/dish" exact component={()=><div>dish</div>}/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}


class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <AdminLayout/>
                </Router>
            </div>
        );
    }
}



export default App;
