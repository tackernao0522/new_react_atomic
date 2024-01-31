# Section7: グローバルなstate管理を知る

## 39. ツライ例を実装してみる

- `src/components/pages/Top.jsx`を編集  

```jsx:Top.jsx
import styled from "styled-components";
import { SecondaryButton } from "../atoms/button/SecondaryButton";

export const Top = () => {
  return (
    <SContainer>
      <h2>TOPページです</h2>
      <SecondaryButton>管理者ユーザー</SecondaryButton> {/* 追加 */}
      <br /><br />
      <SecondaryButton>一般ユーザー</SecondaryButton> {/* 追加 */}
    </SContainer>
  );
};

const SContainer = styled.div`
  text-align: center;
`;
```

- `src/components/atoms/button/SecondaryButton.jsx`を編集  

```jsx:SecondaryButton.jsx
import styled from "styled-components";
import { BaseButton } from "./BaseButton";

export const SecondaryButton = (props) => {
  const { children, onClick } = props; {/* 追加 */}
  return <SButton onClick={onClick}>{children}</SButton>; {/* 追加 */}
};

const SButton = styled(BaseButton)`
  background-color: #11999e;
`;
```

- `src/components/pages/Top.jsx`を編集  

```jsx:Top.jsx
import styled from "styled-components";
import { SecondaryButton } from "../atoms/button/SecondaryButton";

export const Top = () => {
  const onClickAdmin = () => alert("管理"); {/* 追加 */}
  const onClickGeneral = () => alert("一般"); {/* 追加 */}

  return (
    <SContainer>
      <h2>TOPページです</h2>
      <SecondaryButton onClick={onClickAdmin}>管理者ユーザー</SecondaryButton> {/* 編集 */}
      <br />
      <br />
      <SecondaryButton onClick={onClickGeneral}>一般ユーザー</SecondaryButton> {/* 編集 */}
    </SContainer>
  );
};

const SContainer = styled.div`
  text-align: center;
`;
```

- `src/components/pages/Top.jsx`を編集  

```jsx:Top.jsx
import styled from "styled-components";
import { SecondaryButton } from "../atoms/button/SecondaryButton";
import { useNavigate } from "react-router-dom"; // 追加

export const Top = () => {
  const navigate = useNavigate(); // 追加

  const onClickAdmin = () => navigate("/users"); // 編集
  const onClickGeneral = () => navigate("/users"); // 編集

  return (
    <SContainer>
      <h2>TOPページです</h2>
      <SecondaryButton onClick={onClickAdmin}>管理者ユーザー</SecondaryButton>
      <br />
      <br />
      <SecondaryButton onClick={onClickGeneral}>一般ユーザー</SecondaryButton>
    </SContainer>
  );
};

const SContainer = styled.div`
  text-align: center;
`;
```

- `src/components/pages/Top.jsx`を編集  

```jsx:Top.jsx
import styled from "styled-components";
import { SecondaryButton } from "../atoms/button/SecondaryButton";
import { useNavigate } from "react-router-dom";

export const Top = () => {
  const navigate = useNavigate();

  const onClickAdmin = () => navigate("/users", { state: { isAdmin: true } }); // 編集
  const onClickGeneral = () =>
    navigate("/users", { state: { isAdmin: false } }); // 編集

  return (
    <SContainer>
      <h2>TOPページです</h2>
      <SecondaryButton onClick={onClickAdmin}>管理者ユーザー</SecondaryButton>
      <br />
      <br />
      <SecondaryButton onClick={onClickGeneral}>一般ユーザー</SecondaryButton>
    </SContainer>
  );
};

const SContainer = styled.div`
  text-align: center;
`;
```

- `src/components/pages/User.jsx`を編集  

```jsx:User.jsx
import styled from "styled-components";
import { SearchInput } from "../molecules/SearchInput";
import { UserCard } from "../organism/user/UserCard";
import { useLocation } from "react-router-dom"; // 追加

const users = [...Array(10).keys()].map((val) => {
  return {
    id: val,
    name: `たかき${val}`,
    image: "https://source.unsplash.com/JBrbzg5N7Go",
    email: "takaki55730317@gmail.com",
    phone: "090-1438-2914",
    company: {
      name: "テスト株式会社"
    },
    website: "https://yahoo.com"
  };
});

export const Users = () => {
  const { state } = useLocation(); // 追加
  console.log(state); // 追加 stateの中身を確認してみる

  return (
    <SContainer>
      <h1>ユーザー一覧</h1>
      <SearchInput />
      <SUserArea>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </SUserArea>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const SUserArea = styled.div`
  padding-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;
```

- `src/components/pages/User.jsx`を編集  

```jsx:User.jsx
import styled from "styled-components";
import { SearchInput } from "../molecules/SearchInput";
import { UserCard } from "../organism/user/UserCard";
import { useLocation } from "react-router-dom";

const users = [...Array(10).keys()].map((val) => {
  return {
    id: val,
    name: `たかき${val}`,
    image: "https://source.unsplash.com/JBrbzg5N7Go",
    email: "takaki55730317@gmail.com",
    phone: "090-1438-2914",
    company: {
      name: "テスト株式会社"
    },
    website: "https://yahoo.com"
  };
});

export const Users = () => {
  const { state } = useLocation();
  const isAdmin = state ? state.isAdmin : false; // 編集

  return (
    <SContainer>
      <h1>ユーザー一覧</h1>
      <SearchInput />
      <SUserArea>
        {users.map((user) => (
          <UserCard key={user.id} user={user} isAdmin={isAdmin} /> {/* 編集 */}
        ))}
      </SUserArea>
    </SContainer>
  );
};

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const SUserArea = styled.div`
  padding-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;
```

- `src/components/organism/user/UserCard.jsx`を編集  

```jsx:UserCard.jsx
import { Card } from "../../atoms/card/Card";
import styled from "styled-components";
import { UserIconWithName } from "../../molecules/user/UserIconWithName";

export const UserCard = (props) => {
  const { user, isAdmin } = props;

  return (
    <Card>
      <UserIconWithName image={user.image} name={user.name} isAdmin={isAdmin} /> {/* 編集 */}
      <SDl>
        <dt>メール</dt>
        <dd>{user.email}</dd>
        <dt>TEL</dt>
        <dd>{user.phone}</dd>
        <dt>会社名</dt>
        <dd>{user.company.name}</dd>
        <dt>WEB</dt>
        <dd>{user.website}</dd>
      </SDl>
    </Card>
  );
};

const SDl = styled.dl`
  text-align: left;
  dt {
    float: left;
  }
  dd {
    padding-left: 32px;
    padding-bottom: 8px;
    overflow-wrap: break-word;
  }
`;
```

- `src/components/molecules/user/UserIconWithName.jsx`を編集  

```jsx:UserIconWithName.jsx
import styled from "styled-components";

export const UserIconWithName = (props) => {
  const { image, name, isAdmin } = props; // 編集

  return (
    <SContainer>
      <SImg height={160} width={160} src={image} alt={name} />
      <SName>{name}</SName>
      {isAdmin && <SEdit>編集</SEdit>} {/* 追加 */}
    </SContainer>
  );
};

const SContainer = styled.div`
  text-align: center;
`;
const SImg = styled.img`
  border-radius: 50%;
`;
const SName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #40514e;
`;
// 追加
const SEdit = styled.span`
  text-decoration: underline;
  color: #aaa;
  cursor: pointer;
`;
// ここまで
```