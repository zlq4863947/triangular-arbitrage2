import { Logger } from '@arbitrage-libs/logger';
import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Logger, AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    const res = solarTerm(2021, 5, 9);
    expect(service).toBeDefined();
  });
});

function solarTerm(year, month, dayofmonth) {
  const input_time = new Date(year, month - 1, dayofmonth + 1).getTime();
  const text_arr = [
    '小寒',
    '大寒',
    '立春',
    '雨水',
    '惊蛰',
    '春分',
    '清明',
    '谷雨',
    '立夏',
    '小满',
    '芒种',
    '夏至',
    '小暑',
    '大暑',
    '立秋',
    '处暑',
    '白露',
    '秋分',
    '寒露',
    '霜降',
    '立冬',
    '小雪',
    '大雪',
    '冬至',
  ];

  const diff_month = [
    1272060,
    1275495,
    1281180,
    1289445,
    1299225,
    1310355,
    1321560,
    1333035,
    1342770,
    1350855,
    1356420,
    1359045,
    1358580,
    1355055,
    1348695,
    1340040,
    1329630,
    1318455,
    1306935,
    1297380,
    1286865,
    1277730,
    1274550,
    1271556,
  ];
  const diff_month_avg = 1314871.5;
  const day_time = 24 * 60 * 60; // 86400
  const month_time = 30 * day_time; // 2592000
  const diff_year = 31556926000;
  const begin_time = 947120460000;
  const begin_year = 2000;
  const begin_month = 1;
  const begin_day = 6;

  let output;
  if (year < begin_year) {
    var year_size = begin_year - year;
    output = begin_time - year_size * diff_year;
  } else if (year > begin_year) {
    var year_size = year - begin_year;
    output = begin_time + year_size * diff_year;
  }

  let m_index = 0;
  if (month > begin_month) {
    const month_size = month - begin_month;
    m_index = Math.round((month_time * month_size) / diff_month_avg);
    for (let i = 0; i < m_index; i++) {
      output = output + diff_month[i] * 1000;
    }
  }

  // dayofmonth > begin_day
  if (input_time > output) {
    output = output + diff_month[m_index] * 1000;
    m_index++;
  }

  // dayofmonth > begin_day
  if (input_time > output) {
    output = output + diff_month[m_index] * 1000;
    m_index === 23 ? (m_index = 0) : m_index++;
  }

  return [output, text_arr[m_index]];
}
