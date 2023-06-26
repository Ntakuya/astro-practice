# Tanstack Query

## checks

- [ ] performance when current value is same as past value(check value check system)
- [ ] query caching

## 2. query caching

設定したqueryごとにデータをキャッシュ化する

```
1. [tasks]
2. [tasks, 1]
3. [tasks, 2]
2と3は同一のcacheで最後に取得されたものがキャッシュ対象になる。
利用する場合はkeepPreviousDataをtrueにする？
```

```
[tasks]
[tasks, 1]
[tasks, 2]
でtasksに一部データが入っている場合の対応は、queryCacheを利用して取得が可能になる。

detailの取得次にlistを上書きすることもありかも。(listのupdate辛いからdictionaryでデータを持った方がらくだけど。。。)
```