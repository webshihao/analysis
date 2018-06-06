const express = require('express');
const apiRouter = express.Router();
const app = express();

let {
  LoginData,
  CompetitiveData,
  CollectionData,
  MediaData,
  SearchData,
  TableData,
  DoCollectionData,
  GetReportListData,
  AddReportListData,
  ChangeReportListData,
  EditReportData,
  SaveReportData,
  ReportListData,
  RemoveReportListData
} = require('./../src/api/index.js');

// 设置cors跨域
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
};

app.use(allowCrossDomain);

apiRouter.post('/login/user_login', function(req, res) {
    res.json(LoginData)
});
apiRouter.get('/yuqing/get_cmp_lst', function(req, res) {
    res.json(CompetitiveData)
});
apiRouter.get('/yuqing/get_col_list', function(req, res) {
    res.json(CollectionData)
});
apiRouter.get('/yuqing/get_media_list', function(req, res) {
    res.json(MediaData)
});
apiRouter.post('/yuqing/get_search_list', function(req, res) {
    res.json(SearchData)
});
apiRouter.post('/yuqing/get_opi_list', function(req, res) {
    res.json(TableData)
});
apiRouter.get('/yuqing/do_collect', function(req, res) {
    res.json(DoCollectionData)
});
apiRouter.get('/yuqing/get_rpt_name_list', function(req, res) {
    res.json(GetReportListData)
});
apiRouter.get('/yuqing/add_single_rpt', function(req, res) {
    res.json(AddReportListData)
});
apiRouter.get('/yuqing/add_opi_to_rpt', function(req, res) {
    res.json(ChangeReportListData)
});
apiRouter.post('/yuqing/get_rpt_dtl', function(req, res) {
    res.json(EditReportData)
});
apiRouter.post('/report/sav_rpt_dtl', function(req, res) {
    res.json(SaveReportData)
});
apiRouter.post('/report/get_rpt_list', function(req, res) {
    res.json(ReportListData)
});
apiRouter.get('/report/del_rpt', function(req, res) {
    res.json(RemoveReportListData)
});
module.exports = apiRouter;