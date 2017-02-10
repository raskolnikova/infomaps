import React, {Component} from 'react';
import {Link} from 'react-router'
import './index.less'

export default class NavBar extends Component {

    handleDataSetAdd(dataSet) {
           DataSetActions.createDataSet(dataset);
       }


    render() {
        return (
            <nav className="flex-container">
              <Link to='/'>
                  <div className='button'>
                      <div className='wrap-but'>
                          <i className="fa fa-home fa-3x"></i>
                          <div className='inscription'>На главную</div>
                      </div>
                  </div>
              </Link>
                <Link to='/datasets'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-files-o fa-3x"></i>
                            <div className='inscription'>Наборы данных</div>
                        </div>
                    </div>
                </Link>
                <Link to='/container-charts'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-bar-chart fa-3x"></i>
                            <div className='inscription'>Редактор диаграмм</div>
                        </div>
                    </div>
                </Link>
                <Link to='/container-map'>
                    <div className='button'>
                        <div className='wrap-but'>
                            <i className="fa fa-map-marker fa-3x"></i>
                            <div className='inscription'>Редактор карт</div>
                        </div>
                    </div>
                </Link>

            </nav>
        )
    }
}
