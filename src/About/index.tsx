import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Link from '../Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 24,
    },
    wrap: {
      marginBottom: '2em',
    },
    tableContariner: {
      width: 330 + 20,
      maxWidth: '100%'
    },
    table: {
      margin: 10,
      width: 'calc(100% - 20)',
      maxWidth: 330,
    },
    cellLeft: {
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      borderRightColor: theme.palette.divider,
    },
    bold: {
      fontWeight: 'bold',
    },
    inline: {
      display: 'inline',
    },
    numbered: {
      position: 'absolute',
    },
    indent: {
      paddingLeft: '1.5em',
    },
    video: {
      width: '100%',
      maxWidth: 1280 / 2,
    },
  })
);


function Index() {
  const classes = useStyles();

  const T = (props: TypographyProps) => <Typography variant="h4" {...props}>{props.children}</Typography>;

  const P = (props: TypographyProps) => <Typography variant="body1" {...props}>{props.children}</Typography>;

  const B = (props: TypographyProps) => <Typography variant="body1" className={[classes.bold, classes.inline].join(' ')} {...props}>{props.children}</Typography>;

  return (
    <div className={classes.root}>
      <Box m={0.5} className={classes.wrap}>
        <T>本ツールについて</T>
        <Box m={0.5}>
          <P>本ツールはモンスターハンターライズ（MHRise）のゲーム内映像から所持している護石のスキル構成を解析するツールです。</P>
          <P>現時点では以下の2通りの映像から解析を行うことができます。</P>
          <Box m={1}><Link href="#renkin">錬金の結果新規で取得する護石の一覧</Link></Box>
          <Box m={1}><Link href="#box">アイテムBOXの護石の一覧</Link></Box>
        </Box>
      </Box>
      <Box m={0.5} className={classes.wrap}>
        <T id="video-format">アップロードする動画の形式</T>
        <Box m={0.5}>
          <P>アップロードする動画は以下の形式を使用して下さい。</P>
          <P>Switchの動画撮影機能を使用すると、以下の条件を全て満たせます。</P>
          <Box m={1}>
            <TableContainer component={Paper} className={classes.tableContariner}>
              <Table className={classes.table}>
                <TableBody>
                  {[
                    { title: '動画形式', detail: 'mp4' },
                    { title: '動画の長さ', detail: '数秒〜30秒程度' },
                    { title: '解像度', detail: '1280×720(推奨)' },
                    { title: 'ファイルサイズ', detail: '20MB' },
                    { title: '動画内の護石の数', detail: '1〜150個程度' },
                  ].map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row" className={classes.cellLeft}> {row.title} </TableCell>
                      <TableCell align="right">{row.detail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <P>また、本ツールでは<B>画面内に護石の情報が表示されているかどうか</B>の判定は行っていません。</P>
          <P>したがって、事前に護石の情報が写っている範囲にトリミングする必要があります。</P>
          <P>アップロードする動画の例は後述します。</P>
        </Box>
      </Box>
      <Box m={0.5} className={classes.wrap}>
        <T id="renkin">錬金リザルトから</T>
        <Box m={0.5}>
          <P>錬金の結果、護石を受け取る映像から解析を行うことができます。</P>
          <Box m={1}>
            <Typography variant="h5">手順</Typography>
            <Box m={0.5}>
              <P className={classes.numbered}>1.</P>
              <P className={classes.indent}>ギルドストアから<B>マカ錬金</B>→<B>護石を受け取る</B>と進み、錬金が完了している護石の一覧を表示する</P>
              <P className={classes.indent}>※背景色が暗いほうが検出精度が高いため、<B>集会所雑貨屋のマイド</B>から受け取りを行うことをおすすめします</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>2.</P>
              <P className={classes.indent}>表示された護石をAボタン長押しで全て受け取る</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>3.</P>
              <P className={classes.indent}>Switchのキャプチャーボタンを長押しし、動画を撮影する</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>4.</P>
              <P className={classes.indent}>撮影した動画をPCやスマートフォンに転送する</P>
              <P className={classes.indent}>参考：
                <Link href="https://topics.nintendo.co.jp/article/adab1919-feac-4167-9f3e-40107ba1348e" target="_blank" rel="noopener noreferrer">
                  Nintendo Switchで撮影した画面写真や動画をスマートデバイスやPCに転送
                </Link>
              </P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>5.</P>
              <P className={classes.indent}>任意の動画を編集するツールを使い、護石の詳細が写っている部分のみにカットする</P>
              <P className={classes.indent}>※Switchに組み込まれている動画編集機能では正確なカットができないことがあるため、別のツールを使うことをおすすめします。</P>
            </Box>
          </Box>
        </Box>
        <P>以上の手順により作成した以下の動画を参考にして下さい。</P>
        <Box m={3}>
          <video controls muted src="/video/renkin.mp4" className={classes.video} />
        </Box>
      </Box>
      <Box m={0.5} className={classes.wrap}>
        <T id="box">アイテムBOXから</T>
        <Box m={0.5}>
          <P>アイテムBOXの護石を走査する映像から解析を行うことができます。</P>
          <P>ただし、背景が定まらないため錬金リザルトに比べて誤検出が増加します。</P>
          <P>（スキル名の誤りや同じ護石の重複検出など）</P>
          <Box m={1}>
            <Typography variant="h5">手順</Typography>
            <Box m={0.5}>
              <P className={classes.numbered}>1.</P>
              <P className={classes.indent}>事前準備として、アイテムBOXから<B>装備管理</B>→<B>装飾品の着脱</B>→<B>装備BOX</B>と進み、マイナスボタンで全ての装飾品を一括解除</P>
              <P className={classes.indent}>※装飾品が装備されていると誤検出の原因となります。</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>2.</P>
              <P className={classes.indent}>アイテムBOXから<B>装備管理</B>→<B>装備の変更</B>→<B>護石</B>と進み、所持している護石の一覧を表示する</P>
              <P className={classes.indent}>※背景色が暗いほうが検出精度が高いため、<B>集会所のアイテムBOX</B>から行うことをおすすめします</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>3.</P>
              <P className={classes.indent}>表示された護石を1つずつ選択して表示する</P>
              <P className={classes.indent}>※同じ護石を重複して表示すると2つとしてカウントされるため、注意して下さい</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>4.</P>
              <P className={classes.indent}>Switchのキャプチャーボタンを長押しし、動画を撮影する</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>5.</P>
              <P className={classes.indent}>撮影した動画をPCやスマートフォンに転送する</P>
              <P className={classes.indent}>参考：
                <Link href="https://topics.nintendo.co.jp/article/adab1919-feac-4167-9f3e-40107ba1348e" target="_blank" rel="noopener noreferrer">
                  Nintendo Switchで撮影した画面写真や動画をスマートデバイスやPCに転送
                </Link>
              </P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>6.</P>
              <P className={classes.indent}>任意の動画を編集するツールを使い、護石の詳細が写っている部分のみにカットする</P>
              <P className={classes.indent}>※Switchに組み込まれている動画編集機能では正確なカットができないことがあるため、別のツールを使うことをおすすめします。</P>
            </Box>
          </Box>
        </Box>
        <P>以上の手順により作成した以下の動画を参考にして下さい。</P>
        <Box m={3}>
          <video controls muted src="/video/box.mp4" className={classes.video} />
        </Box>
      </Box>
      <Box m={0.5} className={classes.wrap}>
        <T>動画のアップロード及び護石情報の解析</T>
        <Box m={0.5}>
          <P><Link href="/">トップページ</Link>より、案内に従って動画をアップロードするだけで自動的に動画の解析を行います。
            <B>結果</B>のステップでは、<B>TABLE</B>、<B>CSV</B>、<B>JSON</B>のいずれかの形式で出力可能です。
            コピーボタンでまるごとコピー可能なため、お好きな形式を選択してご利用下さい。</P>
          <P>※TABLE形式ではタブ文字区切りのテキストがコピーされます。</P>{/*<br />
          <P>スプレッドシートへ貼り付ける際、TABLE形式からコピーしたものを貼り付けるたときに1セル内に全てのテキストが挿入されることがありますが、
          <B>右クリック</B>→<B>特殊貼り付け</B>→<B>値のみ貼り付け</B>とすることで表のまま貼り付けることができます。</P>*/}
        </Box>
      </Box>
      <Box m={0.5} className={classes.wrap}>
        <T>解析がタイムアウトする、または解析の精度が著しく悪い場合</T>
        <Box m={0.5}>
          <Box m={1}>
            <Typography variant="h5">解析に失敗する場合、以下の原因が考えられます。</Typography>
            <Box m={0.5}>
              <P className={classes.numbered}>1.</P>
              <P className={classes.indent}>ネットワークが不安定</P>
              <P className={classes.indent}>動画の解析中は、インターネットへの接続を切らないようお願いします。</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>2.</P>
              <P className={classes.indent}>タブを閉じる、リロードを行うなど</P>
              <P className={classes.indent}>タブを閉じる、リロードするなどを行うと結果が受信できません。</P>
              <P className={classes.indent}>解析には時間を要しますので、そのままお待ち下さい。</P>
            </Box>
          </Box>
        </Box>
        <Box m={0.5}>
          <Box m={1}>
            <Typography variant="h5">解析がタイムアウトする場合、以下の原因が考えられます。</Typography>
            <Box m={0.5}>
              <P className={classes.numbered}>1.</P>
              <P className={classes.indent}>動画の形式が不正</P>
              <P className={classes.indent}><Link href="#video-format">こちら</Link>を参考に動画の形式を調整して下さい。</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>2.</P>
              <P className={classes.indent}>動画内で、護石の表示切り替えの速度が遅い</P>
              <P className={classes.indent}>同じ護石を長く(数秒程度)表示していると、別の護石と判定され、重複して解析されてしまうことがあります。</P>
              <P className={classes.indent}>目安として、BOX内の黄色い枠が点滅しきらない程度で次の護石に切り替えを行って下さい。</P>
              <P className={classes.indent}><Link href="#renkin">錬金リザルトから</Link>または<Link href="#box">アイテムBOXから</Link>に添付の動画を参考にして下さい。</P>
            </Box>
          </Box>
        </Box>
        <Box m={0.5}>
          <Box m={1}>
            <Typography variant="h5">解析結果の精度が著しく悪い場合、以下の原因が考えられます。</Typography>
            <Box m={0.5}>
              <P className={classes.numbered}>1.</P>
              <P className={classes.indent}>動画がズレている</P>
              <P className={classes.indent}>Switchの録画機能ではなくキャプチャーボードなどを経由して外部で録画している場合、動画が全体的にズレている可能性があります。</P>
              <P className={classes.indent}>本ツールでは護石情報の表示は固定で参照しているため、動画にズレがあると解析精度が著しく低下します。</P>
              <P className={classes.indent}>その場合は、お手数ですがSwitch本体の録画機能をご利用下さい。</P>
            </Box>
            <Box m={0.5}>
              <P className={classes.numbered}>2.</P>
              <P className={classes.indent}>動画の色合いが異なる</P>
              <P className={classes.indent}>1 と同じく、外部で録画している場合、Switch本体での録画と比べて色合いが異なる場合があります。</P>
              <P className={classes.indent}>こちらの場合も、お手数ですがSwitch本体の録画機能をご利用下さい。</P>
            </Box>
          </Box>
        </Box>
      </Box>
      <P>上記以外で不明な点、不具合などあれば画面下の問い合わせフォームまたはツイッターアカウントへご連絡下さい。</P>
    </div>
  );
}

export default Index;
