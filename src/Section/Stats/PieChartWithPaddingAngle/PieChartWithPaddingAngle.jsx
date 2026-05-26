import { useContext } from 'react';
import { Legend, Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { AppContext } from '../../../Context/AppContext';
import { GrDocumentOutlook } from 'react-icons/gr';

const PieChartWithPaddingAngle = () => {
    const { timeline } = useContext(AppContext);

    const VideoData = timeline.filter(vdata => vdata.sm === "Video");
    const CallData = timeline.filter(cdata => cdata.sm === "Call");
    const TextData = timeline.filter(tdata => tdata.sm === "Text");

    const data = [
        { name: 'Call', value: CallData.length },
        { name: 'Text', value: TextData.length },
        { name: 'Video', value: VideoData.length },
    ].filter(item => item.value > 0); // Only show segments with counts > 0

    // Premium Color System
    const COLORS = ['#10b981', '#6366f1', '#06b6d4']; // Emerald, Indigo, Cyan

    return (
        <div className='py-4 flex flex-col items-center justify-center min-h-[300px] w-full'>
            {timeline.length !== 0 ? (
                <div className="w-full h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius="70%"
                                outerRadius="90%"
                                cornerRadius={8}
                                paddingAngle={4}
                                dataKey="value"
                                isAnimationActive={true}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ 
                                    background: 'rgba(255, 255, 255, 0.95)', 
                                    border: 'none', 
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    color: '#1e293b'
                                }} 
                            />
                            <Legend 
                                verticalAlign="bottom" 
                                height={36} 
                                iconType="circle"
                                iconSize={8}
                                formatter={(value) => (
                                    <span className="text-slate-600 text-xs font-bold px-2">{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="text-center py-10 space-y-3">
                    <div className="w-16 h-16 mx-auto bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-xl">
                        <GrDocumentOutlook />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-700 text-base">No Data Found</h3>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">
                            Add some check-in logs first to visualize the relationship breakdown.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PieChartWithPaddingAngle;
