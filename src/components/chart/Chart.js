import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Label, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

// const chartData = [
//     {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
//     {name: 'Page B', uv: 300, pv: 2300, amt: 2300},
//     {name: 'Page C', uv: 700, pv: 2200, amt: 2200}];




const Chart = (props) => {
    const [getData, setData] = useState(0);
    const [ohlc, setohlc] = useState(0);
    

    const getOHLC = (data) => {
        const chartData = []
        if(data){
            for(let i=0; i<data.length; i++){
                const dt = new Date(data[i][0])
                const dataPt = {
                    "name": dt.toLocaleString(),
                    "usd": (data[i][4] * props.balance)
                }
                chartData.push(dataPt)
            }
            return chartData
        }else{
            return(
                <div>No Data</div>
            )
        }
        
        
    }

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=365')
        .then((response) => {
            return response.json();
            })
        .then((data) => {
            setData(data)
        })
    }, []);

    useEffect(() => {
        const val = getOHLC(getData)
        setohlc(val)
    }, [props.balance]);
    
    
    if(ohlc.length > 0){
        return (
            <ResponsiveContainer>
                <LineChart width={400} height={200} data={ohlc} margin={{ top: 5, right: 20, bottom: 5, left: 30 }} >
                    <Line type="monotone" dataKey="usd" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name">
                        <Label value="Date" offset={0} position="insideBottom"/>
                    </XAxis>
                    <YAxis label={{ value: '(USD)', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
            
        );
    }else{
        return(
            <div>Loading...</div>
        )
    }
    
};

export default Chart;
