from corona_virus_spider import run_spider
from my_app_flask import run_app

# 专门为了低耦合做了2个开关
# 操作文件的主程序，爬虫每获取一页信息设置sleep(1)，主要是为了降低爬取速度保证安全
if __name__ == '__main__':
    begin_page = 1  # 开始页数
    end_page = 2  # 结束页数
    # 以下两个开关分别是：
    # --爬虫数据生成--
    # --web服务器搭建--
    run_spider(begin_page, end_page)
    run_app()

    # 手动打开网页：http://127.0.0.1:5000（默认本机网址）
    # 自动打开暂时无法在同一个python里打开，会出很多问题。
    # 运行过程中发现os.system会阻塞进程（直接调用run_app也会），尝试用信号控制kill子进程，但是又没有意外关闭机制，会生成僵尸进程
    # 原本是使用subprocess.Popen，但是这会生成多线程，导致很多情况下无法即使kill到服务器，使得服务器大量占用内存
    # 最终还是选择人工打开页面，或者另写一个打开页面的程序，尝试过这样子做，最后决定不用单独写这些了（自动打开页面代码就下面三行。。。运行它还不如手动打开）
    # import webbrowser
    # url_host = 'http://127.0.0.1:5000'
    # webbrowser.open(url_host)
