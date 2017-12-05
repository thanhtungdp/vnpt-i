Dự án frontend sử dụng các thư viện cốt lõi sau cho việc phát triển

* atlaskit (UI component)
* redux (Store management)
* redux-await (Fetch await data)
* react-router (Page router)

Để hiểu về thông tin dự án, vui lòng đọc tại trang `Wiki` của project này.

## Các lệnh
```
yarn run start # Dev Server
yarn run build # Build ra dự án
yarn run prettier # Tự động format code
```

## Cài đặt dự án

```
git clone git@gitlab.com:vietan-chatthairan/swm-cms-frontend.git
cd swm-cms-frontend
yarn install
yarn run start // mở trình duyệt cổng 3000
```

## Đóng góp thay đổi code
Để phát triển code của dự án, các thành viên vui lòng tạo branch mới từ nhánh develop.
Quy trình thực hiện như sau:
```
git checkout develop
git branch feature/[name] # tạo nhánh từ develop
git checkout feature/[name] # chuyển sáng phát triển feature
```

Thực hiện commit khi hoàn thành 1 file có thể sử dụng, tránh tình trạng commit file quá nhiều.
Sau khi thực hiện sau quá trình phát triển feature, cần rà soát lại các mục sau

* Code warning: được báo trong phần terminal, các biến không sử dụng, cách đặt tên sai
* Prettier: Prettiter các file code

Sau đó thưc hiện push lên, vào tạo pull request yêu cầu `product owner` check và merge.