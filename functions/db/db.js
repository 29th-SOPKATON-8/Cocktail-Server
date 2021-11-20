// �ʿ��� ����
const functions = require('firebase-functions');
const { Pool, Query } = require('pg');
const dayjs = require('dayjs');
const dotenv = require('dotenv');
dotenv.config();

// DB Config (����, ȣ��Ʈ, DB �̸�, �н�����)�� �ε����ݽô�.
const dbConfig = require('../config/dbConfig');

// NODE_ENV��� �۷ι� ȯ�溯���� ����ؼ�, ���� ȯ���� � '���'���� �Ǻ����ݽô�.
let devMode = process.env.NODE_ENV === 'development';

// SQL �������� �ֿܼ� ����Ʈ���� ���� �������ִ� ������ �����սô�.
const sqlDebug = true;

// �⺻ ���������� �츮�� �����ϰ� �Ǵ� SQL �������� �ֿܼ� ������ �ʱ� ������,
// pg ���̺귯�� ������ �Լ��� ��¦ �պ��� SQL �������� �ֿܼ� ������ ����� �ݽô�.
const submit = Query.prototype.submit;
Query.prototype.submit = function () {
  const text = this.text;
  const values = this.values || [];
  const query = text.replace(/\$([0-9]+)/g, (m, v) => JSON.stringify(values[parseInt(v) - 1]));
  // devMode === true �̸鼭 sqlDebug === true�� �� SQL �������� �ֿܼ� ��ڴٴ� �б��Դϴ�.
  devMode && sqlDebug && console.log(`\n\n[? SQL STATEMENT]\n${query}\n_________\n`);
  submit.apply(this, arguments);
};

// ������ ����Ǹ� ���� ȯ���� ���� ���(����)���� ���δ��� ���(����)���� �ֿܼ� ����ݽô�.
console.log(`[?DB] ${process.env.NODE_ENV}`);

// Ŀ�ؼ� Ǯ�� �������ݴϴ�.
const pool = new Pool({
  ...dbConfig,
  connectionTimeoutMillis: 60 * 1000,
  idleTimeoutMillis: 60 * 1000,
});

// ������ ������ Ŀ�ؼ� Ǯ���� Ŀ�ؼ��� �������� �Լ��� �����մϴ�.
// �⺻������ �����Ǵ� pool.connect()�� pool.connect().release() �Լ��� ������ �޽����� �߰��ϴ� �۾��Դϴ�.
const connect = async (req) => {
  const now = dayjs();
  const string =
    !!req && !!req.method
      ? `[${req.method}] ${!!req.user ? `${req.user.id}` : ``} ${req.originalUrl}\n ${!!req.query && `query: ${JSON.stringify(req.query)}`} ${!!req.body && `body: ${JSON.stringify(req.body)}`} ${
          !!req.params && `params ${JSON.stringify(req.params)}`
        }`
      : `request ����`;
  const callStack = new Error().stack;
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  const releaseChecker = setTimeout(() => {
    devMode
      ? console.error('[ERROR] client connection�� 15�� ���� ��������� �ʾҽ��ϴ�.', { callStack })
      : functions.logger.error('[ERROR] client connection�� 15�� ���� ��������� �ʾҽ��ϴ�.', { callStack });
    devMode ? console.error(`���������� ����� �������Դϴ�. ${client.lastQuery}`) : functions.logger.error(`���������� ����� �������Դϴ�. ${client.lastQuery}`);
  }, 15 * 1000);

  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    clearTimeout(releaseChecker);
    const time = dayjs().diff(now, 'millisecond');
    if (time > 4000) {
      const message = `[RELEASE] in ${time} | ${string}`;
      devMode && console.log(message);
    }
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};

module.exports = {
  connect,
};