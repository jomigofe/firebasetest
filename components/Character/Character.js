import React      from 'react'

const Character = ({
  char
}) => {
  const { c, n, x, y } = char

  const styles = {
    "--color": c,
    "--x": x,
    "--y": y
  }

  return(
    <div
      className="c"
      style={styles}
    >
      <div className="cH">
        <div className="cN">{n}</div>
      </div>
    </div>
  )
}

export default Character