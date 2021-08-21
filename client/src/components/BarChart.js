import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Container } from 'react-bootstrap'
import Search from '../pages/Search';

const BarChart = () => {

    return (
        <Container className='p-5'>

            <Bar
                data={{
                    labels: ['Healthcare', 'Taxation', 'Education', 'Housing', 'Living', 'Safety', 'Environment', 'Economy'],
                    datasets: [
                        {
                            label: 'Score',
                            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]

                }}
                height={300}
                width={350}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 10
                        }
                    }
                }}
            />

        </Container>

    )
}


export default BarChart