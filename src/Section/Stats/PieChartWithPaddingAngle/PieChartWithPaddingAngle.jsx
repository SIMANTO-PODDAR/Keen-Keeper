import { useContext } from 'react';
import { Legend, Pie, PieChart, Tooltip } from 'recharts';
import { TLContext } from '../../../TimeLineContext/TimeLineContext';
import { GrDocumentOutlook } from 'react-icons/gr';

const PieChartWithPaddingAngle = () => {
    const { TimeLineData } = useContext(TLContext);

    const VideoData = TimeLineData.filter(vdata => vdata.sm == "Video");
    const CallData = TimeLineData.filter(cdata => cdata.sm == "Call");
    const TextData = TimeLineData.filter(tdata => tdata.sm == "Text");

    const data = [
        { name: 'Call', value: CallData.length, fill: '#244d3f' },
        { name: 'Text', value: TextData.length, fill: '#4b1aa5' },
        { name: 'Video', value: VideoData.length, fill: '#4ad488' },
    ];

    return (
        <div className='py-3 flex justify-center items-center'>
            {
                TimeLineData.length != 0 ? (
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1, paddingBottom: '30px' }} responsive>
                        <Pie
                            data={data}
                            innerRadius="80%"
                            outerRadius="100%"
                            cornerRadius="50%"
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            isAnimationActive={true}
                        />
                        <Legend style={{ paddingTop: '15px' }} />
                        <Tooltip />
                    </PieChart>
                ) :
                    (<h1 className="text-3xl font-bold text-center py-15 sm:py-3"> <GrDocumentOutlook className="text-center mx-auto m-3" />No Stats Data Available!</h1>)
            }


        </div>
    );
};

export default PieChartWithPaddingAngle;


