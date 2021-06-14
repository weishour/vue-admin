import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '/@/mock/_utils';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'weishour',
      realname: 'Vue Admin',
      avatar: 'https://avatars.githubusercontent.com/u/19448421?s=60&v=4',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realname: 'test user',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'tester',
      token: 'fakeToken2',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};
export default [
  // mock user login
  {
    url: '/api/auth/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        item => item.username === username && password === item.password
      );
      if (!checkUser) {
        return resultError('帐户或密码错误！');
      }
      const { userId, username: _username, token, realname, desc, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realname,
        desc,
      });
    },
  },
  {
    url: '/api/users/info',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);

      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find(item => item.token === token);

      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);

      if (!token) return resultError('Invalid token');

      const checkUser = createFakeUserList().find(item => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }

      const codeList = fakeCodeList[checkUser.userId];

      return resultSuccess(codeList);
    },
  },
] as MockMethod[];
