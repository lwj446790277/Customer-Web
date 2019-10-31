<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="运营商基础数据" name="first">
                <div class="back">
                    <h2>运营商基础数据</h2>
                    <div class="main">
                        <el-table border :data="firstData" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="phoneNumber" label="本机号码" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="operatorType" label="运营商类型" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="name" label="姓名" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="idcard" label="身份证号" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="email" label="邮箱" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="address" label="地址" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="accumulatePoints" label="账户积分" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="registrationHistory" label="在网时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="orderDescription" label="套餐详情" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="availableAmount" label="当前可用余额" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phoneNumberLocation" label="本机号码归属地" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="mainActiveLocation" label="主要活动区域" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="mainLocationPercent" label="主要活动区域占比" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通信检测" name="second">
                <div class="back">
                    <h2>通信检测</h2>
                    <div class="main">
                        <el-table border :data="secondData" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="theLastCallTime" label="最近通话时间" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="silentCount" label="静默次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="silentDurationTime" label="静默时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="averageSilentDurationTime" label="平均静默时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="theLastSilentDurationTime" label="最近一次静默时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="nightActivities" label="夜间活动情况" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="longSilentTime" label="最长一次静默时间" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="longSilentDurationTime" label="最长一次静默时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="theLongSilentDurationTime" label="最长一次静默时间 + 时长" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通信记录相关" name="sixth">
                <div class="back">
                    <h2>通信记录相关</h2>
                    <div class="main">
                        <el-table :span-method="changeSpan" border :data="sixthData" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="itemName" label="类别名称" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="idcardMatching" label="身份证匹配结果" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="nameMatching" label="姓名匹配结果" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="networkLengthCheck" label="入网时长检查" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="idcard" label="身份证检查" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phoneNumber" label="手机号检查" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="netName" label="互联网标记" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phoneNumber" label="号码" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingCount" label="主叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledCount" label="被叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' label="近24小时通话" align="center">
                                <el-table-column :resizable='false' prop="near24HourTime" label="时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="near24HourCalling" label="次数" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' label="1-7天通话" align="center">
                                <el-table-column :resizable='false' prop="near7DayCallTime" label="时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="near7DayCalling" label="次数" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' label="7-30天通话" align="center">
                                <el-table-column :resizable='false' prop="near1MonthCallTime" label="时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="near1MonthCalling" label="次数" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' label="30-90天通话" align="center">
                                <el-table-column :resizable='false' prop="near3MonthCallTime" label="时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="near3MonthCalling" label="次数" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' label="90-180天通话" align="center">
                                <el-table-column :resizable='false' prop="near6MonthCallTime" label="时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="near6MonthCalling" label="次数" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' prop="riskLevel" label="风险评估" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="紧急联系人" name="third">
                <div class="back">
                    <h2>紧急联系人</h2>
                    <div class="main">
                        <el-table border :data="thirdData" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="relation" label="关系" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="name" label="姓名" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phoneNumber" label="号码" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="idNumber" label="身份证号码" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="labelName" label="互联网标记" align="center"></el-table-column>
                            <el-table-column :resizable='false' label="近一个月通话统计" align="center">
                                <el-table-column :resizable='false' prop="oneCallingCount" label="主叫次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="oneCalledCount" label="被叫次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="oneTotalCallCount" label="总共通话次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="oneCallingDurationTime" label="主叫通话时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="oneCalledDurationTime" label="被叫通话时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="oneTotalCallDurationTime" label="总共通话时长" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' label="近三个月通话统计" align="center">
                                <el-table-column :resizable='false' prop="threeCallingCount" label="主叫次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="threeCalledCount" label="被叫次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="threeTotalCallCount" label="总共通话次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="threeCallingDurationTime" label="主叫通话时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="threeCalledDurationTime" label="被叫通话时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="threeTotalCallDurationTime" label="总共通话时长" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' label="近六个月通话统计" align="center">
                                <el-table-column :resizable='false' prop="sixCallingCount" label="主叫次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="sixCalledCount" label="被叫次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="sixTotalCallCount" label="总共通话次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="sixCallingDurationTime" label="主叫通话时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="sixCalledDurationTime" label="被叫通话时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="sixTotalCallDurationTime" label="总共通话时长" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' label="总通话统计" align="center">
                                <el-table-column :resizable='false' prop="allCallingCount" label="主叫次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="allCalledCount" label="被叫次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="allTotalCallCount" label="总共通话次数" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="allCallingDurationTime" label="主叫通话时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="allCalledDurationTime" label="被叫通话时长" align="center"></el-table-column>
                                <el-table-column :resizable='false' prop="allTotalCallDurationTime" label="总共通话时长" align="center"></el-table-column>
                            </el-table-column>
                            <el-table-column :resizable='false' prop="workdayDurationTime" label="工作日通话时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="offdayDurationTime" label="非工作日通话时长" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通话区域分布" name="fourth">
                <div class="back">
                    <h2>通话区域分布</h2>
                    <div class="main">
                        <el-table border :data="fourthData" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="city" label="城市" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callCount" label="通话次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingCount" label="主叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingDurationTime" label="时间统计" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledCount" label="被叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledDurationTime" label="被叫时间(分钟)" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingCountPer" label="主叫次数百分比" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingDurationTimePer" label="主叫时间百分比" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledCountPer" label="被叫次数百分比" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledDurationTimePer" label="被叫时间百分比" align="center"></el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination :current-page="page4" :page-size="pageSize4" layout="total, prev, pager, next, jumper" :page-count="totalPageCount4" :total="totalCount4"
                                           @current-change="currentChange4">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="出行分析表" name="fifth">
                <div class="back">
                    <h2>出行分析表</h2>
                    <div class="main">
                        <el-table border :data="fifthData" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="duringType" label="时间段" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="startTime" label="出行时间" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="returnTime" label="回程时间" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="departurePlace" label="出行地" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="destinationPlace" label="目的地" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="durationDays" label="行程时间（天）" align="center"></el-table-column>
                        </el-table>
                        <div class="block">
                            <el-pagination :current-page="page5" :page-size="pageSize5" layout="total, prev, pager, next, jumper" :page-count="totalPageCount5" :total="totalCount5"
                                           @current-change="currentChange5">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通话记录详情" name="seventh">
                <div class="back">
                    <h2>通话记录详情</h2>
                    <div class="main">
                        <h3>通话月份分布</h3>
                        <el-table border :data="callMonth" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="month" label="月份" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callPhoneNumberCount" label="通话号码" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="twoWayPhoneNumberPer" label="互通占比" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callCount" label="呼叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingCount" label="主叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingDurationTime" label="主叫时长(分钟)" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledCount" label="被叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledDurationTime" label="被叫时长(分钟)" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="smsCount" label="短信数量" align="center"></el-table-column>
                        </el-table>
                        <h3>通话时间段分布</h3>
                        <el-table border :data="callTime" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="timeBucket" label="时间段" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callCount" label="通话次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phoneCount" label="号码个数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="phoneTimes" label="最常联系号码及次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingCount" label="主叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingDurationTime" label="主叫时长(分钟)" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledCount" label="被叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledDurationTime" label="被叫时长(分钟)" align="center"></el-table-column>
                        </el-table>
                        <h3>通话时长分布</h3>
                        <el-table border :data="callLong" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="timeDuration" label="通话时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingCount" label="主叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingDurationTime" label="主叫时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledCount" label="被叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledDurationTime" label="被叫时长" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="通话亲密度" name="eighth">
                <div class="back">
                    <h2>通话亲密度</h2>
                    <div class="main">
                        <h3>通话次数前10</h3>
                        <el-table border :data="callCountTop10" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="phoneNumber" label="通话号码" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callCount" label="通话次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingCount" label="主叫次数" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledCount" label="被叫次数" align="center"></el-table-column>
                        </el-table>
                        <h3>通话总时长前10</h3>
                        <el-table border :data="callLongTop10" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="phoneNumber" label="通话号码" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callDurationTime" label="通话时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callingDurationTime" label="主叫时长" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="calledDurationTime" label="被叫时长" align="center"></el-table-column>
                        </el-table>
                        <h3>单次通话时长前10</h3>
                        <el-table border :data="oneCallTop10" style="width: 100%;line-height: 60px;">
                            <el-table-column :resizable='false' prop="phoneNumber" label="通话号码" align="center"></el-table-column>
                            <el-table-column :resizable='false' prop="callDurationTime" label="通话时长" align="center"></el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="用户基础信息" name="first">
                 <div class="back">
                     <h2>用户基础信息</h2>
                     <div class="main">
                         <table cellpadding="20" cellspacing="0" class="account_news">
                             <tr>
                                 <th>抓取时间</th>
                                 <td>
                                     <div>{{user.update_time}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>用户姓名</th>
                                 <td>
                                     <div>{{user.real_name}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>身份证号</th>
                                 <td>
                                     <div>{{user.id_card}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>电话号码</th>
                                 <td>
                                     <div>{{user.phone}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>号码类型（地区+三大运营商）</th>
                                 <td>
                                     <div>{{user.user_source}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>号码注册地址</th>
                                 <td>
                                     <div>{{user.addr}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>入网时间</th>
                                 <td>
                                     <div>{{user.reg_time}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>当前账户余额</th>
                                 <td>
                                     <div>{{user.phone_remain}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>套餐名称</th>
                                 <td>
                                     <div>{{user.package_name}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>用户积分</th>
                                 <td>
                                     <div>{{user.score}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>用户星级</th>
                                 <td>
                                     <div>{{user.star_level}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>用户实名状态</th>
                                 <td>
                                     <div>{{user.authentication}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>客户状态</th>
                                 <td>
                                     <div>{{user.phone_status}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>其他联系人号码</th>
                                 <td>
                                     <div>{{user.contact_phone}}</div>
                                 </td>
                             </tr>
                         </table>
                     </div>
                 </div>
             </el-tab-pane>
             <el-tab-pane label="通话记录信息" name="second">
                 <div class="back">
                     <h2>通话记录信息</h2>
                     <div class="main">
                         <el-table border :data="currentTelData" style="width: 100%;line-height: 60px;">
                             <el-table-column :resizable='false' prop="call_time" label="通话时间" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="receive_phone" label="对方号码" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="trade_type" label="通讯类型" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="trade_addr" label="通话地点" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="call_type" label="呼叫类型" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="business_name" label="业务类型" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="trade_time" label="通话时长(秒)" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="special_offer" label="优惠套餐" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="fee" label="费用" align="center"></el-table-column>
                         </el-table>
                         <div class="block">
                             <el-pagination
                                 :current-page="page"
                                 :page-size="pageSize"
                                 @current-change="currentChange"
                                 layout="total, prev, pager, next, jumper"
                                 :page-count="totalPageCount"
                                 :total="totalCount"
                             ></el-pagination>
                         </div>
                     </div>
                 </div>
             </el-tab-pane>
             <el-tab-pane label="短信记录" name="third">
                 <div class="back">
                     <h2>短信记录</h2>
                     <div class="main">
                         <el-table border :data="currentShortMessageDetailData" style="width: 100%;line-height: 60px;">
                             <el-table-column :resizable='false' prop="send_time" label="发送时间" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="receiver_phone" label="对方号码" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="trade_addr" label="短信地址" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="trade_way" label="短信状态" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="business_name" label="业务类型" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="trade_type" label="信息类型" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="special_offer" label="优惠套餐" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="fee" label="短信费用" align="center"></el-table-column>
                         </el-table>
                         <div class="block">
                             <el-pagination
                                 :current-page="page2"
                                 :page-size="pageSize2"
                                 @current-change="currentChange2"
                                 layout="total, prev, pager, next, jumper"
                                 :page-count="totalPageCount2"
                                 :total="totalCount2"
                             ></el-pagination>
                         </div>
                     </div>
                 </div>
             </el-tab-pane>
             <el-tab-pane label="月账单记录" name="forth">
                 <div class="back">
                     <h2>月账单记录</h2>
                     <div class="main">
                         <el-table border :data="currentBillData" style="width: 100%;line-height: 60px;">
                             <el-table-column :resizable='false' prop="month" label="月份" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="call_pay" label="当月话费" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="pay_fee" label="实际缴纳费用" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="package_fee" label="套餐固定费用" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="msg_fee" label="额外套餐费-短信" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="tel_fee" label="额外套餐费-通话" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="net_fee" label="额外套餐费-流量" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="addtional_fee" label="增值业务费" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="preferential_fee" label="优惠费" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="generation_fee" label="本人替他人代付费" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="other_fee" label="他人替本人代付费" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="otherspaid_fee" label="其他费用" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="score" label="当月积分" align="center"></el-table-column>
                         </el-table>
                         <div class="block">
                             <el-pagination
                                 :current-page="page3"
                                 :page-size="pageSize3"
                                 @current-change="currentChange3"
                                 layout="total, prev, pager, next, jumper"
                                 :page-count="totalPageCount3"
                                 :total="totalCount3"
                             ></el-pagination>
                         </div>
                     </div>
                 </div>
             </el-tab-pane>
             <el-tab-pane label="流量记录" name="fifth">
                 <div class="back">
                     <h2>流量记录</h2>
                     <div class="main">
                         <el-table border :data="currentNetData" style="width: 100%;line-height: 60px;">
                             <el-table-column :resizable='false' prop="start_time" label="起始时间" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="trade_addr" label="通信地点" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="preferential_fee" label="优惠套餐" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="business_name" label="业务名称" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="total_time" label="总时长(秒)" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="total_traffic" label="总流量(KB)" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="net_type" label="网络类型" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="net_way" label="上网方式" align="center"></el-table-column>
                             <el-table-column :resizable='false' prop="fee" label="通信费用" align="center"></el-table-column>
                         </el-table>
                         <div class="block">
                             <el-pagination
                                 :current-page="page4"
                                 :page-size="pageSize4"
                                 @current-change="currentChange4"
                                 layout="total, prev, pager, next, jumper"
                                 :page-count="totalPageCount4"
                                 :total="totalCount4"
                             ></el-pagination>
                         </div>
                     </div>
                 </div>
             </el-tab-pane>
             &lt;!&ndash;
               <el-tab-pane label="充值记录" name="sixth">
                   <div class="back">
                       <h2>充值记录</h2>
                       <div class="main">
                           <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                               <el-table-column prop="type" label="充值时间" align="center"></el-table-column>
                               <el-table-column prop="name" label="充值方式" align="center"></el-table-column>
                               <el-table-column prop="phone" label="充值金额" align="center"></el-table-column>
                           </el-table>
                       </div>
                   </div>
               </el-tab-pane>
               <el-tab-pane label="上网记录" name="seventh">
                   <div class="back">
                       <h2>上网记录</h2>
                       <div class="main">
                           <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                               <el-table-column prop="type" label="开始时间" width="93" align="center"></el-table-column>
                               <el-table-column prop="name" label="业务类型" width="93" align="center"></el-table-column>
                               <el-table-column prop="phone" label="流量类型" width="93" align="center"></el-table-column>
                               <el-table-column prop="name" label="业务名称" width="93" align="center"></el-table-column>
                               <el-table-column prop="phone" label="流量名称" width="93" align="center"></el-table-column>
                               <el-table-column prop="name" label="时长(秒)" width="93" align="center"></el-table-column>
                               <el-table-column prop="name" label="通信类型" width="93" align="center"></el-table-column>
                               <el-table-column prop="name" label="流量类型" width="93" align="center"></el-table-column>
                               <el-table-column prop="phone" label="上传流量(KB)" width="125" align="center"></el-table-column>
                               <el-table-column prop="phone" label="下载流量(KB)" width="125" align="center"></el-table-column>
                               <el-table-column prop="phone" label="总流量(KB)" width="110" align="center"></el-table-column>
                               <el-table-column prop="phone" label="本地ip" width="93" align="center"></el-table-column>
                               <el-table-column prop="phone" label="访问ip" width="93" align="center"></el-table-column>
                               <el-table-column prop="phone" label="浏览器提示" width="110" align="center"></el-table-column>
                               <el-table-column prop="phone" label="访问网址" width="93" align="center"></el-table-column>
                               <el-table-column prop="phone" label="域名" align="center"></el-table-column>
                           </el-table>
                       </div>
                   </div>
               </el-tab-pane>
               <el-tab-pane label="亲情网信息" name="eighth">
                   <div class="back">
                       <h2>亲情网信息</h2>
                       <div class="main">
                           <el-table border :data="tableData" style="width: 100%;line-height: 60px;">
                               <el-table-column prop="type" label="编号" align="center"></el-table-column>
                               <el-table-column prop="name" label="亲情网手机号码" align="center"></el-table-column>
                               <el-table-column prop="phone" label="短号" align="center"></el-table-column>
                               <el-table-column prop="name" label="归属地" align="center"></el-table-column>
                               <el-table-column prop="phone" label="成员类型" align="center"></el-table-column>
                               <el-table-column prop="name" label="加入日期" align="center"></el-table-column>
                               <el-table-column prop="name" label="结束日期" align="center"></el-table-column>
                           </el-table>
                       </div>
                   </div>
               </el-tab-pane>
                &ndash;&gt;
             <el-tab-pane label="月份总信息" name="ninth">
                 <div class="back">
                     <h2>月份总信息</h2>
                     <div class="main">
                         <table cellpadding="20" cellspacing="0" class="account_news">
                             <tr>
                                 <th>账单可抓取月份数</th>
                                 <td>
                                     <div>{{billdata.normal_cnt}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>账单抓取失败月份数</th>
                                 <td>
                                     <div>{{billdata.miss_cnt}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>账单未空月份数</th>
                                 <td>
                                     <div>{{billdata.empty_cnt}}</div>
                                 </td>
                             </tr>
                             &lt;!&ndash; <tr>
                                  <th>具体每月抓取状态</th>
                                  <td>
                                      <div>{{phone}}</div>
                                  </td>
                              </tr>&ndash;&gt;
                             <tr>
                                 <th>通话可抓取月份数</th>
                                 <td>
                                     <div>{{teldata.normal_cnt}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>通话抓取失败月份数</th>
                                 <td>
                                     <div>{{teldata.miss_cnt}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>通话为空月份数</th>
                                 <td>
                                     <div>{{teldata.empty_cnt}}</div>
                                 </td>
                             </tr>
                             &lt;!&ndash;<tr>
                                 <th>具体每月抓取状态</th>
                                 <td>
                                     <div>{{realityBorrowMoney}}</div>
                                 </td>
                             </tr>&ndash;&gt;
                             <tr>
                                 <th>短信可抓取月份数</th>
                                 <td>
                                     <div>{{msgdata.normal_cnt}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>短信抓取失败月份数</th>
                                 <td>
                                     <div>{{msgdata.miss_cnt}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>短信未空月份数</th>
                                 <td>
                                     <div>{{msgdata.empty_cnt}}</div>
                                 </td>
                             </tr>
                             &lt;!&ndash;<tr>
                                 <th>具体每月抓取状态</th>
                                 <td>
                                     <div>{{pipelinenumber}}</div>
                                 </td>
                             </tr>&ndash;&gt;
                             <tr>
                                 <th>流量可抓取月份数</th>
                                 <td>
                                     <div>{{netdata.normal_cnt}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>流量抓取失败月份数</th>
                                 <td>
                                     <div>{{netdata.miss_cnt}}</div>
                                 </td>
                             </tr>
                             <tr>
                                 <th>流量未空月份数</th>
                                 <td>
                                     <div>{{netdata.empty_cnt}}</div>
                                 </td>
                             </tr>
                             &lt;!&ndash; <tr>
                                  <th>具体每月抓取状态</th>
                                  <td>
                                      <div>{{pipelinenumber}}</div>
                                  </td>
                              </tr>&ndash;&gt;
                         </table>
                     </div>
                 </div>
             </el-tab-pane>-->
        </el-tabs>
    </div>
</template>

<script>
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                activeName: "first",
                firstData: [],
                thirdData: [],
                fourthData: [],
                fifthData: [],
                sixthData: [],
                page1: 1,
                pageSize1: 10,
                totalPageCount1: 0,
                totalCount1: 0,
                secondData: [],
                page5: 1,
                pageSize5: 10,
                totalPageCount5: 0,
                totalCount5: 0,

                tableData: [],
                userJson: {},
                user: {},
                telDetailData: [],
                currentTelData: [],
                shortMessageDetailData: [],
                currentShortMessageDetailData: [],
                page: 1,
                pageSize: 10,
                totalPageCount: 0,
                totalCount: 0,
                billDetailData: [],
                currentBillData: [],
                page3: 1,
                pageSize3: 10,
                totalPageCount3: 0,
                totalCount3: 0,
                currentNetData: [],
                netDetailData: [],
                page4: 1,
                pageSize4: 10,
                totalPageCount4: 0,
                totalCount4: 0,
                billdata: {},
                teldata: {},
                msgdata: {},
                netdata: {},
                change: false,
                callMonth: [],
                callTime: [],
                callLong: [],
                callCountTop10: [],
                callLongTop10: [],
                oneCallTop10: []
            }
        },
        watch: {   //监听值变化：map值
            "$route": {
                handler(route) {
                    var that = this;
                    if (route.path == '/riskManagement') {
                        that.id = route.query.id;
                        that.SearchFirst();
                        that.activeName = "first";
                    }
                }
            }
        },
        created() {
            var that = this;
            var url = window.location.href;
            that.id = url.substr(url.indexOf('=') + 1);
            this.SearchFirst();
        },
        methods: {
            SearchFirst() {
                var that = this;
                that.firstData = [];
                that.secondData = [];
                that.thirdData = [];
                that.axios.get('/user/queryUserAttesta', {
                    params: {userid: that.id, page: that.page1}
                }).then(res => {
                    that.firstData = JSON.parse(res.data.listopera);
                    that.secondData = JSON.parse(res.data.listcomdet);
                    that.thirdData = JSON.parse(res.data.listemecon);
                }).catch(function (error) {
                    console.log(error)
                })
            },
            SearchFourth() {
                var that = this;
                that.fourthData = [];
                that.axios.get('/user/queryauthenconcity', {
                    params: {userid: that.id, page: that.page4}
                }).then(res => {
                    that.fourthData = JSON.parse(res.data.listconcity);
                    var pageutil = JSON.parse(res.data.pageUtil);
                    that.page4 = pageutil.page;
                    that.totalPageCount4 = pageutil.totalPageCount;
                    that.pageSize4 = pageutil.pageSize;
                    that.totalCount4 = pageutil.totalCount;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            SearchFifth() {
                var that = this;
                that.fifthData = [];
                that.axios.get('/user/queryauthenave', {
                    params: {userid: that.id, page: that.page5}
                }).then(res => {
                    that.fifthData = JSON.parse(res.data.listave);
                    var pageutil = JSON.parse(res.data.pageUtil);
                    that.page5 = pageutil.page;
                    that.totalPageCount5 = pageutil.totalPageCount;
                    that.pageSize5 = pageutil.pageSize;
                    that.totalCount5 = pageutil.totalCount;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            changeSpan({row, column, rowIndex, columnIndex}) {
                var that = this;
                if (row.rowSpan > 0 && that.change && (column.label == '类别名称' || column.label == '身份证匹配结果' || column.label == '姓名匹配结果'
                    || column.label == '入网时长检查' || column.label == '身份证检查' || column.label == '手机号检查' || column.label == '互联网标记' || column.label == '风险评估')) {
                    return {
                        rowspan: row.rowSpan,
                        colspan: 1
                    };
                } else if (row.rowSpan_0 == true && that.change && (column.label == '类别名称' || column.label == '身份证匹配结果' || column.label == '姓名匹配结果'
                    || column.label == '入网时长检查' || column.label == '身份证检查' || column.label == '手机号检查' || column.label == '互联网标记' || column.label == '风险评估')) {
                    return {
                        rowspan: 1,
                        colspan: 0
                    }
                }
            },
            SearchSixth() {
                var that = this;
                that.change = false;
                that.sixthData = [];
                that.axios.get('/user/queryAllsen', {
                    params: {userid: that.id}
                }).then(res => {
                    that.sixthData = JSON.parse(res.data.listsen);
                    if (!that.sixthData || !that.sixthData.length) {
                        return false;
                    }
                    var tempList = [];
                    for (var i = 0; i < that.sixthData.length; i++) {
                        if (!!that.sixthData[i].listc && !!that.sixthData[i].listc.length) {
                            var object = {};
                            for (var j = 0; j < that.sixthData[i].listc.length; j++) {
                                var push = true;
                                object.idcardMatching = that.sixthData[i].idcardMatching;
                                object.nameMatching = that.sixthData[i].nameMatching;
                                object.networkLengthCheck = that.sixthData[i].networkLengthCheck;
                                object.phoneNumber = that.sixthData[i].phoneNumber;
                                object.idcard = that.sixthData[i].idcard;
                                object.riskLevel = that.sixthData[i].riskLevel;
                                object.itemName = that.sixthData[i].itemName;
                                object.netName = that.sixthData[i].listc[j].name;
                                if (that.sixthData[i].listc[j].listct.length == 1) {
                                    object.calledCount = that.sixthData[i].listc[j].listct[0].calledCount;
                                    object.callingCount = that.sixthData[i].listc[j].listct[0].callingCount;
                                    object.phoneNumber = that.sixthData[i].listc[j].listct[0].phoneNumber;
                                    object.near24HourCalling = that.sixthData[i].listc[j].listct[0].listcs[0].totalCallCount;
                                    object.near24HourTime = that.sixthData[i].listc[j].listct[0].listcs[0].totalCallDurationTime;
                                    object.near7DayCalling = that.sixthData[i].listc[j].listct[0].listcs[1].totalCallCount;
                                    object.near7DayCallTime = that.sixthData[i].listc[j].listct[0].listcs[1].totalCallDurationTime;
                                    object.near1MonthCalling = that.sixthData[i].listc[j].listct[0].listcs[2].totalCallCount;
                                    object.near1MonthCallTime = that.sixthData[i].listc[j].listct[0].listcs[2].totalCallDurationTime;
                                    object.near3MonthCalling = that.sixthData[i].listc[j].listct[0].listcs[3].totalCallCount;
                                    object.near3MonthCallTime = that.sixthData[i].listc[j].listct[0].listcs[3].totalCallDurationTime;
                                    object.near6MonthCalling = that.sixthData[i].listc[j].listct[0].listcs[4].totalCallCount;
                                    object.near6MonthCallTime = that.sixthData[i].listc[j].listct[0].listcs[4].totalCallDurationTime;
                                } else {
                                    var _array = [];
                                    push = false;
                                    object.calledCount = that.sixthData[i].listc[j].listct[0].calledCount;
                                    object.callingCount = that.sixthData[i].listc[j].listct[0].callingCount;
                                    object.phoneNumber = that.sixthData[i].listc[j].listct[0].phoneNumber;
                                    object.near24HourCalling = that.sixthData[i].listc[j].listct[0].listcs[0].totalCallCount;
                                    object.near24HourTime = that.sixthData[i].listc[j].listct[0].listcs[0].totalCallDurationTime;
                                    object.near7DayCalling = that.sixthData[i].listc[j].listct[0].listcs[1].totalCallCount;
                                    object.near7DayCallTime = that.sixthData[i].listc[j].listct[0].listcs[1].totalCallDurationTime;
                                    object.near1MonthCalling = that.sixthData[i].listc[j].listct[0].listcs[2].totalCallCount;
                                    object.near1MonthCallTime = that.sixthData[i].listc[j].listct[0].listcs[2].totalCallDurationTime;
                                    object.near3MonthCalling = that.sixthData[i].listc[j].listct[0].listcs[3].totalCallCount;
                                    object.near3MonthCallTime = that.sixthData[i].listc[j].listct[0].listcs[3].totalCallDurationTime;
                                    object.near6MonthCalling = that.sixthData[i].listc[j].listct[0].listcs[4].totalCallCount;
                                    object.near6MonthCallTime = that.sixthData[i].listc[j].listct[0].listcs[4].totalCallDurationTime;
                                    object.rowSpan = that.sixthData[i].listc[j].listct.length;
                                    _array.push(object)
                                    for (var k = 1; k < that.sixthData[i].listc[j].listct.length; k++) {
                                        var tempObject = {};
                                        tempObject.calledCount = that.sixthData[i].listc[j].listct[k].calledCount;
                                        tempObject.callingCount = that.sixthData[i].listc[j].listct[k].callingCount;
                                        tempObject.phoneNumber = that.sixthData[i].listc[j].listct[k].phoneNumber;
                                        tempObject.near24HourCalling = that.sixthData[i].listc[j].listct[k].listcs[0].totalCallCount;
                                        tempObject.near24HourTime = that.sixthData[i].listc[j].listct[k].listcs[0].totalCallDurationTime;
                                        tempObject.near7DayCalling = that.sixthData[i].listc[j].listct[k].listcs[1].totalCallCount;
                                        tempObject.near7DayCallTime = that.sixthData[i].listc[j].listct[k].listcs[1].totalCallDurationTime;
                                        tempObject.near1MonthCalling = that.sixthData[i].listc[j].listct[k].listcs[2].totalCallCount;
                                        tempObject.near1MonthCallTime = that.sixthData[i].listc[j].listct[k].listcs[2].totalCallDurationTime;
                                        tempObject.near3MonthCalling = that.sixthData[i].listc[j].listct[k].listcs[3].totalCallCount;
                                        tempObject.near3MonthCallTime = that.sixthData[i].listc[j].listct[k].listcs[3].totalCallDurationTime;
                                        tempObject.near6MonthCalling = that.sixthData[i].listc[j].listct[k].listcs[4].totalCallCount;
                                        tempObject.near6MonthCallTime = that.sixthData[i].listc[j].listct[k].listcs[4].totalCallDurationTime;
                                        tempObject.rowSpan_0 = true;
                                        _array.push(tempObject)
                                    }
                                    tempList = tempList.concat(_array);
                                }
                                if (push) {
                                    tempList.push(object);
                                }
                            }

                        } else {
                            tempList.push(that.sixthData[i]);
                        }
                    }
                    that.sixthData = tempList;
                    that.change = true;
                }).catch(function (error) {
                    console.log(error)
                })
            },
            SearchSeventh() {
                var that = this;
                that.callMonth = [];
                that.callTime = [];
                that.callLong = [];
                that.axios.get('/user/queryTelephone', {
                    params: {userid: that.id}
                }).then(res => {
                    that.callMonth = JSON.parse(res.data.listcommonth);
                    that.callTime = JSON.parse(res.data.listcombuck);
                    that.callLong = JSON.parse(res.data.listcomdur);
                }).catch(function (error) {
                    console.log(error)
                })
            },
            SearchEighth() {
                var that = this;
                that.callCountTop10 = [];
                that.callLongTop10 = [];
                that.oneCallTop10 = [];
                that.axios.get('/user/queryTopten', {
                    params: {userid: that.id}
                }).then(res => {
                    that.callCountTop10 = JSON.parse(res.data.top10call);
                    that.callLongTop10 = JSON.parse(res.data.top10time);
                    that.oneCallTop10 = JSON.parse(res.data.top10sing);
                }).catch(function (error) {
                    console.log(error)
                })
            },
            handleClick() {
                if (this.activeName == "fifth") {
                    this.SearchFifth();
                } else if (this.activeName == "fourth") {
                    this.SearchFourth();
                } else if (this.activeName == "sixth") {
                    this.SearchSixth();
                } else if (this.activeName == 'seventh') {
                    this.SearchSeventh();
                }else if (this.activeName == 'eighth') {
                    this.SearchEighth();
                }
            },
            currentChange4(page) {
                var that = this;
                that.page4 = page;
                that.SearchFourth();
            },
            currentChange5(page) {
                /*  var that = this;
                  that.page2 = page;
                  that.currentShortMessageDetailData = [];
                  that.currentShortMessageDetailData = that.shortMessageDetailData.slice(10 * page - 10, (page * 10));*/
                var that = this;
                that.page5 = page;
                that.SearchFifth();
            },
            currentChange3(page) {
                var that = this;
                that.page3 = page;
                that.currentBillData = [];
                that.currentBillData = that.billDetailData.slice(10 * page - 10, (page * 10));
            },
            /*   currentChange4(page) {
                   var that = this;
                   that.page4 = page;
                   that.currentNetData = [];
                   that.currentNetData = that.netDetailData.slice(10 * page - 10, (page * 10));
               },*/
            /*Search() {
                var that = this;
                that.axios.get('/user/queryUserAttesta', {
                    params: {userid: that.id}
                }).then(res => {
                    var telData = [];
                    var shortMessageData = [];
                    var billData = [];
                    var netData = [];
                    var monthInfo = {};
                    that.userJson = {};
                    if (!res.data.operator || JSON.parse(res.data.operator.operatorjson).error != 200) {
                        that.userJson = {};
                        that.user = {};
                        that.billdata = {};
                        that.teldata = {};
                        that.msgdata = {};
                        that.teldata = {};
                    } else {
                        that.userJson = JSON.parse(res.data.operator.operatorjson);
                        that.user = that.userJson.wd_api_mobilephone_getdatav2_response.data.data_list[0].userdata;
                        telData = that.userJson.wd_api_mobilephone_getdatav2_response.data.data_list[0].teldata;
                        shortMessageData = that.userJson.wd_api_mobilephone_getdatav2_response.data.data_list[0].msgdata;
                        billData = that.userJson.wd_api_mobilephone_getdatav2_response.data.data_list[0].billdata;
                        netData = that.userJson.wd_api_mobilephone_getdatav2_response.data.data_list[0].netdata;
                        monthInfo = that.userJson.wd_api_mobilephone_getdatav2_response.data.data_list[0].monthinfo;
                        that.billdata = monthInfo.billdata;
                        that.teldata = monthInfo.teldata;
                        that.msgdata = monthInfo.msgdata;
                        that.teldata = monthInfo.teldata;
                    }
                    that.user.authentication = that.user.authentication == 0 ? '未知' : that.user.authentication == 1 ? '已认证' : that.user.authentication == 2 ? '未认证' : '其他'
                    that.user.phone_status = that.user.phone_status == 0 ? '未知' : that.user.phone_status == 1 ? '正常' : that.user.phone_status == 2 ? '停机' : that.user.phone_status == 3 ? '单向停机' : '其他'

                    that.telDetailData = [];
                    if (!!telData.length) {
                        for (var i = 0; i < telData.length; i++) {
                            if (!!telData[i].items.length) {
                                for (var j = 0; j < telData[i].items.length; j++) {
                                    that.telDetailData.push(telData[i].items[j]);
                                }
                            }
                        }
                    }
                    that.totalCount = that.telDetailData.length;
                    that.totalPageCount = that.telDetailData.length / 10;
                    that.currentChange(1);

                    that.shortMessageDetailData = [];
                    if (!!shortMessageData.length) {
                        for (var i = 0; i < shortMessageData.length; i++) {
                            if (!!shortMessageData[i].items.length) {
                                for (var j = 0; j < shortMessageData[i].items.length; j++) {
                                    that.shortMessageDetailData.push(shortMessageData[i].items[j]);
                                }
                            }
                        }
                    }
                    that.totalCount2 = that.shortMessageDetailData.length;
                    that.totalPageCount2 = that.shortMessageDetailData.length / 10;
                    that.currentChange2(1);

                    that.billDetailData = [];
                    if (!!billData.length) {
                        for (var i = 0; i < billData.length; i++) {
                            that.billDetailData.push(billData[i]);
                        }
                    }
                    that.totalCount3 = that.billDetailData.length;
                    that.totalPageCount3 = that.billDetailData.length / 10;
                    that.currentChange3(1);

                    that.netDetailData = [];
                    if (!!netData.length) {
                        for (var i = 0; i < netData.length; i++) {
                            if (!!netData[i].items.length) {
                                for (var j = 0; j < netData[i].items.length; j++) {
                                    that.netDetailData.push(netData[i].items[j]);
                                }
                            }
                        }
                    }
                    that.totalCount4 = that.netDetailData.length;
                    that.totalPageCount4 = that.netDetailData.length / 10;
                    that.currentChange4(1);
                })
            }*/
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .el-tabs__header {
        margin: 0;
    }

    .main {
        padding: 20px;
        background-color: #fff;
        min-height: 70vh;
    }

    .account_news {
        width: 50%;
        margin: 0 auto;
    }

    .account_news th {
        width: 50%;
        text-align: left;
    }

    .account_news td {
        text-align: center;
    }

    .account_news td div {
        margin-top: -10px;
        margin-bottom: -10px;
        width: 90%;
        height: 40px;
        line-height: 40px;
        background-color: #f3f6fb;
    }

    .block {
        padding-top: 20px;
        text-align: center;
    }

    h3 {
        margin-bottom: 15px;
        margin-top: 15px;
    }
</style>
