

type Props = {
  lhs:any
  rhs:any
}

function MTF(props: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Render options for left-hand side (lhs) */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Left Hand Side (LHS)</h3>
        {props.lhs.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="font-semibold mr-2">{index + 1}.</span>
            <span>{option}</span>
          </div>
        ))}
      </div>
      {/* Render options for right-hand side (rhs) */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Right Hand Side (RHS)</h3>
        {props.rhs.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MTF