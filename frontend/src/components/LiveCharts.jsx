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
  const tooltipStyle = {
    backgroundColor: "#0E1217",
    borderColor: "rgba(255, 255, 255, 0.12)",
    color: "#F3F4F6",
    borderRadius: "6px",
    fontSize: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)"
  };

  const axisTickStyle = {
    fill: "#858D98",
    fontSize: 11
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border border-white/[0.06] rounded-[10px] bg-[#13181F]">
        <h3 className="text-[13px] font-semibold text-[#C4CAD2] mb-3">Drowsiness Score</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
            <XAxis dataKey="time" stroke="#858D98" tick={axisTickStyle} />
            <YAxis domain={[0, 1]} stroke="#858D98" tick={axisTickStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="drowsyScore"
              stroke="#EF3340"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border border-white/[0.06] rounded-[10px] bg-[#13181F]">
        <h3 className="text-[13px] font-semibold text-[#C4CAD2] mb-3">Eye Aspect Ratio (EAR)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
            <XAxis dataKey="time" stroke="#858D98" tick={axisTickStyle} />
            <YAxis stroke="#858D98" tick={axisTickStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="ear"
              stroke="#D8A48F"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border border-white/[0.06] rounded-[10px] bg-[#13181F]">
        <h3 className="text-[13px] font-semibold text-[#C4CAD2] mb-3">PERCLOS</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
            <XAxis dataKey="time" stroke="#858D98" tick={axisTickStyle} />
            <YAxis domain={[0, 1]} stroke="#858D98" tick={axisTickStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="perclos"
              stroke="#6FBF8F"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 border border-white/[0.06] rounded-[10px] bg-[#13181F]">
        <h3 className="text-[13px] font-semibold text-[#C4CAD2] mb-3">Mouth Aspect Ratio (MAR)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
            <XAxis dataKey="time" stroke="#858D98" tick={axisTickStyle} />
            <YAxis stroke="#858D98" tick={axisTickStyle} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="mar"
              stroke="#D9A441"
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