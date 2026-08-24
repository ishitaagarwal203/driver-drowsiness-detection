import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function LiveCharts({ history }) {

  return (
    <div className="charts-section">

      <div className="chart-card">

        <h3>Drowsiness Score</h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >

          <LineChart data={history}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
            />

            <YAxis
              domain={[0, 1]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="drowsyScore"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      <div className="chart-card">

        <h3>Eye Aspect Ratio (EAR)</h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >

          <LineChart data={history}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="ear"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      <div className="chart-card">

        <h3>PERCLOS</h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >

          <LineChart data={history}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
            />

            <YAxis
              domain={[0, 1]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="perclos"
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      <div className="chart-card">

        <h3>Mouth Aspect Ratio (MAR)</h3>

        <ResponsiveContainer
          width="100%"
          height={250}
        >

          <LineChart data={history}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="mar"
              stroke="#ca8a04"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}


export default LiveCharts;