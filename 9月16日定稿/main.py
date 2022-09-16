import os
from corona_virus_spider import CoronaVirusSpider, CoronaVirusWebmake

excel_name_1 = 'province'  # 可设置第一个excel文件名，不带后缀
excel_name_2 = "province_in_diff_days"  # 可设置第一个excel文件名，不带后缀


# 将运行爬虫写如方法，方便开关
def run_spider(begin, end):
    spider = CoronaVirusSpider(excel_name_1)
    sheet_days_in_data = spider.spider_excel_run(begin, end)
    test = CoronaVirusWebmake(sheet_days_in_data, excel_name_1, excel_name_2)
    test.excel_run()


# 操作文件的主程序，
if __name__ == '__main__':
    begin_page = 1
    end_page = 2
    # 一下两个开关分别是--爬虫数据生成--和--web服务器搭建--，可以进行有选择的开关
    run_spider(begin_page, end_page)
    os.system("python my_app_flask.py")

    # 运行过程中发现os.system会阻塞进程，尝试用信号控制kill子进程，但是又没有意外关闭机制，会生成僵尸进程，尝试了很多方法后，没有感觉比手动打开网页更方便
    # 原本是使用subprocess.Popen，但是这会生成多线程，导致很多情况下无法即使kill到服务器，使得服务器大量占用内存
    # 最终还是选择人工打开页面，或者另写一个打开页面的程序，尝试过这样子做，但是与作业无关，就没有放在这里了
    # url_host = 'http://127.0.0.1:5000'
    # webbrowser.open(url_host)
