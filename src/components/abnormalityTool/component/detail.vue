<template>
    <div>
        <Row><center><h4 style="font-weight:600">您的企业共<span style="color:red;padding:0px 6px">{{errorNum}}</span>个异常记录</h4></center></Row>
        <div>
            <div v-if="loading">
                <center>
                    <Loading type="spinner"/>
                    <p style="padding-top:5px;color:#666">税务异常获取中...</p>
                </center>
            </div>
            <div v-else>
                <center><h4>税务异常</h4></center>
                <div v-if="taxation">
                    <div style="margin:auto;width:90%">
                        <table class="table table-striped table-bordered" style="font-size:12px">
                        <thead>
                            <tr>
                                <td>税所</td>
                                <td>税种</td>
                                <td>所属期始</td>
                                <td>所属期止</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>国税</td>
                                <td>企业所得税</td>
                                <td>201801</td>
                                <td>201812</td>
                            </tr>
                            <tr>
                                <td>国税</td>
                                <td>企业所得税</td>
                                <td>201801</td>
                                <td>201812</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <div v-else>
                    <center>
                        <img src="./font.png" alt="" srcset="">
                    </center>
                </div>
            </div>
        </div>
        <div style="margin-top:20px">
            <div v-if="loading">  
                <center>
                    <Loading type="spinner"/>
                    <p style="padding-top:5px;color:#666">工商异常获取中...</p>
                </center>
            </div>
            <div v-else>
                <center><h4>工商异常</h4></center>
                <div v-if="commerce">
                    <cell-group style="margin:auto;width:95%">
                        <cell id="labelem" title="列入经营异常名录的原因" label="通过登记住所无法联系，通过登记住所无法联系，通过登记住所无法联系，通过登记住所无法联系，通过登记住所无法联系，通过登记住所无法联系，通过登记住所无法联系，"></cell>
                        <cell title="列入日期" value="2017年8月03日"></cell>
                        <cell id="depart" title="决定机关" value="广州市天河区工商行政管理局"></cell>
                    </cell-group>
                </div>
                <div v-else>
                    <center>
                        <img src="./font.png" alt="" srcset="">
                    </center>
                </div>
            </div>
        </div>
        <Row style="margin-top:20px">
            <Col span="12">
                <Button type="default" style="margin-left:20px;width:80%">获取实时监控</Button>
            </Col>
            <Col span="12">
                <Button type="primary" style="margin-left:20px;width:80%">分享获得查询次数</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import { Panel, Field, Cell, CellGroup, Icon, Col, Row, Button, Loading } from 'vant'
export default {
    components: {
        Col,
        Row,
        Button,
        Loading,
        CellGroup,
        Cell
    },
    data(){
        return {
            taxation: true,
            commerce: true,
            errorNum: 0,
            loading: false
        }
    }
}
</script>

<style>
#labelem .van-cell__label{
    text-indent: 2em
}

#depart .van-cell__value{
    font-size: 12px
}
</style>


