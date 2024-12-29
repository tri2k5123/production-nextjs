This is the starting code for this tutorial.

**IMPORTANT**: After cloning the repo, open the command line inside the project and run `npm i --legacy-peer-deps`.

<!-- new knowledge 5:39:07
  1 số cấu hình trong vscode để format code

    mongoose -> mongoDB (Server NoSQL)
    prisma -> Postgres (Serverless SQL)

    useTransition();

    cn function: đc dùng khi đã có 1 style mặc định rồi, nhưng từng điều kiện lại hiện 1 style khác nhau

    + npx prisma studio (xem db)
    + npx prisma db push (mỗi khi thay đổi schema.prisma file)

    + use tiptap/react library make form post bài thay cho textarea của shacn

    + react-linkify-it: make link search hashtag (các nội dung có dấu hashtag sẽ biến thành link)

  + react-cropper: to crop image

    + mode: "insensitive" khi where thì lấy chữ hoa chữ thường như nhau

  + ko hiểu satisfies trong file type.ts

   + unstable_cache from "next/cache" : bộ nhớ cache lưu ở server app của mình chứ ko phải cache ở trình duyệt (viết mã truy vấn như MySQL) (TrendsSidebar file)
 -->

<!-- class tailwind
   + line-clamp-1 : chữ sẽ chỉ trên 1 dòng (dư thành ...)
   +
 -->

<!--

    + useConext(truyền phiên xuống các component con)
    + react-query(such as zustand & redux) & tanstack: fetch data & cache dữ liệu & hiển thị post mới ngay khi tạo
    + prisma.$transaction = promise.all (api>post>like>route) (nếu 1 cái thất bại thì cái kia cũng thất bại)

    responsibility:
    + React-hook-form/zod : validate form

    + other feature: với package "react-intersection-observer" nó sẽ cho biết khi nào đã tới hoặc component đó trong khung hình cần thực thi 1 cái j đó 

    + features: logIn, SignUp, logOut, search, change-dark-light-theme, create post-attachments(picture, video, file-video2, some feature to upload like drag-drog, copy-paste), display user haven't follow yet, display hashtag common, search hashtag, infinite scroll, auto up-to-date when post(useMutation-cacheData), delete post, follow user, display các bài post của người mình dang follow | biến #hashtag @username thành link, tạo tooltip khi hover vào username trên bài post và trendsidebar và trong content post nếu có @username, edit profile-uploadthingweb(upload img, crop img, adjust bio, display name), tự động xóa các file đc tải lên mà ko sử dụng định kỳ với cron jobs, post detail page, auto redirect when delete post, like feature, bookmark feature, comment feature, loading infinite comment, delete comment, notice when follow-undo follow-like-undo like-comment, chat realtime, use debounce technique with search, group chat, login with google, 

    + Cron jobs on vercel - a mechanism regularly deletes các file ko sử dụng (tải lên nhưng mà xóa đi và ko post - các file đc tải ấy vẫn ở trong database) [ cron jobs ko chỉ là xóa định kỳ mà là làm 1 việc j đó 1 cách định kỳ ]

    + components: navbar, userIcon, searchInput, Menubar,
    + ứng dụng Suspense làm skeleton cho (TrendsSidebar, ForYouFeed, )
 -->

 <!-- hàm js mới
    + encodeURIComponent (chuyển các ký tự như # thành %23 -> làm chức năng search theo hashtag -> tránh trùng với các kí tự trên thanh )
  -->
<!-- update
  + display name quá dài sẽ bị tràn viền ().
  + làm nút see more ở bio
  + xóa avatar (để thành ảnh mặc định)
  + z-index: của tooltip phần trendsidebar
  + làm phần skeleton cho lúc comment đang load
  + mỗi khi xóa comment phải update lại số comment immediately
  + fix bug giao diện notification button trên laptop
  + sửa phần trending topics bớt hashtag trend lại 3 cái là đc
  
  + Các chức năng mới: update post
  + xem mình đang follow ai
  + update lại display name, bio: sau 7 ngày
 -->
