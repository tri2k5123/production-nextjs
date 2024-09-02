This is the starting code for this tutorial.

**IMPORTANT**: After cloning the repo, open the command line inside the project and run `npm i --legacy-peer-deps`.

<!-- new knowledge 1:03:48
  1 số cấu hình trong vscode để format code

    mongoose -> mongoDB (Server NoSQL)
    prisma -> Postgres (Serverless SQL)

    useTransition();

    cn function: đc dùng khi đã có 1 style mặc định rồi, nhưng từng điều kiện lại hiện 1 style khác nhau

    + npx prisma studio (xem db)
    + npx prisma db push (mỗi khi thay đổi schema.prisma file)

    + use tiptap/react library make form post bài thay cho textarea của shacn

    + react-linkify-it: make link search hashtag (các nội dung có dấu hashtag sẽ biến thành link)

    + mode: "insensitive" khi where thì lấy chữ hoa chữ thường như nhau

   + unstable_cache from "next/cache" : bộ nhớ cache lưu ở server app của mình chứ ko phải cache ở trình duyệt (viết mã truy vấn như MySQL) (TrendsSidebar file)
 -->

<!-- class tailwind
   + line-clamp-1 : chữ sẽ chỉ trên 1 dòng (dư thành ...)
   +
 -->

<!--

    + useConext(truyền phiên xuống các component con)
    + react-query(such as zustand & redux) & tanstack: fetch data & cache dữ liệu & hiển thị post mới ngay khi tạo


    responsibility:
    + React-hook-form/zod : validate form

    + features: logIn, SignUp, logOut, search, change-dark-light-theme, create post, display user haven't follow yet, display hashtag common, search hashtag, infinite scroll, auto up-to-date when post(useMutation), delete post, follow user, display các bài post của người mình dang follow | biến #hashtag @username thành link, tạo tooltip khi hover vào username trên bài post và trendsidebar và trong content post nếu có @username, edit profile-uploadthingweb(upload img, adjust bio, )

    + components: navbar, userIcon, searchInput, Menubar,
    + ứng dụng Suspense làm skeleton cho (TrendsSidebar, ForYouFeed, )
 -->

 <!-- hàm js mới
    + encodeURIComponent (chuyển các ký tự như # thành %23 -> làm chức năng search theo hashtag -> tránh trùng với các kí tự trên thanh )
  -->
<!-- update
  + z-index: của tooltip phần trendsidebar

  + Các chức năng mới: update post
  + xem mình đang follow ai
  + update lại display name, bio: sau 7 ngày
 -->
