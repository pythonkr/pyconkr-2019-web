import classnames from 'classnames'
import { css } from 'emotion'

export type PropsType = {
  light: Date;
  lastUpdate: string | number;
}

export default (props: PropsType) => {
  const { light } = props
  let divStyle = css({
    padding: '15px',
    color: '#82FA58',
    display: 'inline-block',
    font: '50px menlo, monaco, monospace',
    backgroundColor: '#000',
  })

  const lightStyle = css({
    backgroundColor: '#999',
  })

  divStyle = classnames(divStyle, { lightStyle: light ? lightStyle : '' })

  return (
    <div className={divStyle}>
      {format(new Date(props.lastUpdate))}
    </div>
  )
}

const format = (t: any) => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = (n: any) => n < 10 ? `0${n}` : n
