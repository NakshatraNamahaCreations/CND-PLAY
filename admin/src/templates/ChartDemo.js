import React from 'react'
import { StackedBarChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'

export default function ChartDemo() {
  const [stackedBarData, setStackedBarData] = React.useState([
    // refer to tabular data format tutorial
  ])

  const [stackedBarOptions, setStackedBarOptions] = React.useState([
    // refer to chart specific options
  ])

  return (
    <div className="App">
      <StackedBarChart data={stackedBarData} options={stackedBarOptions} />
    </div>
  )
}
