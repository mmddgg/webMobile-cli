import React, { Component } from 'react';
import { NavBar ,List,Icon} from 'antd-mobile';
import es6Promise from "es6-promise";
import sendRequest from "./fetch";

es6Promise.polyfill();

class App extends Component {
  componentWillMount(){
    window.sendRequest = sendRequest;
    sendRequest("http://localhost:3000/webapi/json",{
      method:"POST",
      body:JSON.stringify(
        {
          "header":{"custId":"","staffId":"MB000000","instCd":"205","userGrpCd":"01","srvcCd":"SCU5010401","tmZone":"","deptId":"001","lngCd":"en","txDt":"20181016","chnlDscd":"","scrnId":"","custRprsnId":""},
          "CustIdntyImageIqrySvcIn":{"custId":"P0010003341"}
        }
      )
    }).then(
      res => console.log(res)
    )
  }
  render() {
    const Brief = List.Item.Brief;
    return (
      <div className="App">
        <NavBar
            mode="dark" //light 白底  dark 蓝底
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
        页面标题
        </NavBar>
        <List>
        <List.Item arrow="horizontal" multipleLine={true}
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          onClick={() => {}}
        >
          NickName
          <Brief>Mr.Tom Kim</Brief>
        </List.Item>
        <List.Item arrow="horizontal" multipleLine={true}
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          onClick={() => {}}
        >
          Mobile
          <Brief>+86 13212345678</Brief>
        </List.Item>
        <List.Item arrow="horizontal" multipleLine={true}
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          onClick={() => {}}
        >
          Adress
          <Brief>Jin Rong Da Sha （ Ding Xiang Lu ）, Pudong Xinqu, Shanghai Shi, China, 201203</Brief>
        </List.Item>
        <List.Item arrow="horizontal" multipleLine={true}
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          onClick={() => {}}
        >
          Birth Date
          <Brief>19881212</Brief>
        </List.Item>
        </List>

      </div>
    );
  }
}

export default App;
