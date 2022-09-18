from flask import Flask, render_template
from web_control_data import GetDataFromExcel  # 调用主要接口GetDataFromExcel做数据处理
from corona_virus_spider import excel_name_2  # 调用接口excel_name_2

excel_name = excel_name_2
app = Flask(__name__)


@app.route('/')
def home():
    # 生成html主页，默认日期显示7天，有需要可以更改
    day_len = 7
    data_all = GetDataFromExcel(excel_name)  # 初始化class
    today_list = data_all.get_one_day_data(0)  # 获取今日疫情数据
    day_names = data_all.get_days_for_excel(day_len, 0)  # 获取日期文本信息
    province_names_list = data_all.return_province_names()  # 获取省份名字列表
    chinese_home_data = data_all.get_province_data(province_names_list[0], day_len)  # 获取一个省份的信息
    list_map = data_all.get_map_data(0)  # 获取中国地图的数据
    other_province_data = data_all.get_others_province_data(day_len)  # 获取港澳台数据
    host_7 = data_all.get_hot_point(7)
    host_30 = data_all.get_hot_point(30)
    return render_template("index.html", chinese_home_data=chinese_home_data, day_names=day_names, day_len=day_len,
                           today_list=today_list, province_names_list=province_names_list, list_map=list_map,
                           other_province_data=other_province_data, host_7=host_7, host_30=host_30)


@app.route('/province/<name>')
def province(name):
    # 生成不同省份单独的30天疫情折线图，当然30天这个数据到底多少可以自己设定
    name_temp = name
    day_num = 30
    data_province = GetDataFromExcel(excel_name)
    province_dict = data_province.return_province_dict()
    province_names = data_province.return_province_names()
    if name_temp in province_dict:
        province_num = province_dict[name_temp]
    else:
        province_num = 0
    day_list = data_province.get_days_for_excel(day_num, 1)
    if day_num > len(day_list):
        day_num = len(day_list)
    province_name = province_names[province_num]
    list_data = data_province.get_province_data(province_name, day_num)
    return render_template('index2.html', day_list=day_list, list_data=list_data, province_name=province_name)


@app.route('/totle/<int:sheet>')
def totle_sheet(sheet):
    # 用于生成整个疫情数据的表格，用于详细查看，当然，这个时在web上的吗，有需要的可以直接打开excel表
    data_all = GetDataFromExcel(excel_name)
    if sheet == 1:
        list_all = data_all.get_datas_all_collect_from_excel()[1]
        sheet_name = '本土新增无症状感染者'
    else:
        list_all = data_all.get_datas_all_collect_from_excel()[0]
        sheet_name = '本土新增确诊病例'
    return render_template('index3.html', list_all=list_all, sheet_name=sheet_name)


def run_app():
    app.run()  # 设置的服务器开关，其实只是把os换成了函数接口，觉得这样更符合低耦合

# 服务器搭建的主函数，其中可以设置是否为debug模式，还可以设置端口和ip，一般来说是http://127.0.0.1:5000
# if __name__ == '__main__':
#     app.run(DEBUG=True)
# host='0.0.0.0', port=8080 (可选，在局域网展示)
# pycharm可选编译配置：--host=192.168.3.16 --port=8080
