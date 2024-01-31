# Section7: グローバルな state 管理を知る

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

## 40. Context での state 管理(基本的な使い方)

- `# mkdir src/providers && touch $_/UserProvider.jsx`を実行

- `src/providers/UserProvider.jsx`を編集

```jsx:UserProvider.jsx
import { createContext } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const { children } = props;
  const contextName = "たかき";

  return (
    <UserContext.Provider value={{ contextName }}>
      {children}
    </UserContext.Provider>
  );
};
```

- `src/App.jsx`を編集  

```jsx:App.jsx
import "./App.css";
import { UserProvider } from "./providers/UserProvider"; // 追加
import { Router } from "./router/Router";

export const App = () => {
  return (
    <UserProvider> {/* 追加 */}
      <Router />;
    </UserProvider> {/* 追加 */}
  );
};
```

- `src/components/molecules/user/UserIconWithName.jsx`を編集  

```jsx:UserIconWithName.jsx
import styled from "styled-components";
import { useContext } from "react"; // 追加
import { UserContext } from "../../../providers/UserProvider"; // 追加

export const UserIconWithName = (props) => {
  const { image, name, isAdmin } = props;
  const context = useContext(UserContext); // 追加
  console.log(context); // 追加 確認してみる

  return (
    <SContainer>
      <SImg height={160} width={160} src={image} alt={name} />
      <SName>{name}</SName>
      {isAdmin && <SEdit>編集</SEdit>}
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
const SEdit = styled.span`
  text-decoration: underline;
  color: #aaa;
  cursor: pointer;
`;
```

## 41. Contextでのstate管理(ユーザー情報の設定と参照)

- `src/providers/UserProvider.jsx`を編集  

```jsx:UserProvider.jsx
import { createContext, useState } from "react"; // 編集

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const { children } = props;
  const [userInfo, setUserInfo] = useState(null); // 追加

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}> {/* 編集 */}
      {children}
    </UserContext.Provider>
  );
};
```

- `src/components/pages/Top.jsx`を編集  

```jsx:Top.jsx
import styled from "styled-components";
import { SecondaryButton } from "../atoms/button/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"; // 追加
import { UserContext } from "../../providers/UserProvider"; // 追加

export const Top = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext); // 追加

  // 編集
  const onClickAdmin = () => {
    setUserInfo({ isAdmin: true });
    navigate("/users");
  };
  // 編集
  const onClickGeneral = () => {
    setUserInfo({ isAdmin: false });
    navigate("/users");
  };

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

- `src/components/molecules/user/UserIconWithName.jsx`を編集  

```jsx:UserIconWithName.jsx
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";

export const UserIconWithName = (props) => {
  const { image, name } = props; // 編集
  const { userInfo } = useContext(UserContext); // 編集
  const isAdmin = userInfo ? userInfo.isAdmin : false; // 追加

  return (
    <SContainer>
      <SImg height={160} width={160} src={image} alt={name} />
      <SName>{name}</SName>
      {isAdmin && <SEdit>編集</SEdit>}
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
const SEdit = styled.span`
  text-decoration: underline;
  color: #aaa;
  cursor: pointer;
`;
```

- `src/components/organism/user/UserCard.jsx`を編集  

```jsx:UserCard.jsx
import { Card } from "../../atoms/card/Card";
import styled from "styled-components";
import { UserIconWithName } from "../../molecules/user/UserIconWithName";

export const UserCard = (props) => {
  const { user } = props; // 編集

  return (
    <Card>
      <UserIconWithName image={user.image} name={user.name} /> {/* 編集 */}
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

- `src/components/pages/Users.jsx`を編集  

```jsx:Users.jsx
import styled from "styled-components";
import { SearchInput } from "../molecules/SearchInput";
import { UserCard } from "../organism/user/UserCard";
import { useLocation } from "react-router-dom"; // 削除

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
  const { state } = useLocation(); // 削除
  const isAdmin = state ? state.isAdmin : false; // 削除

  return (
    <SContainer>
      <h1>ユーザー一覧</h1>
      <SearchInput />
      <SUserArea>
        {users.map((user) => (
          <UserCard key={user.id} user={user} /> {/* 編集 */}
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
