@echo off
title Hotel Premium Server
echo ========================================================
echo Starting Hotel Premium Server...
echo ========================================================

:: Kích hoạt môi trường ảo
call env\Scripts\activate.bat

:: Mở trình duyệt mặc định vào trang đăng nhập / trang chủ quản trị
echo Mở trình duyệt mặc định...
start http://127.0.0.1:8000/

:: Chạy server Django
echo Dang khoi dong may chu tai http://127.0.0.1:8000
python manage.py runserver

pause
