import React, { FC } from 'react';
import { ITabContentList } from '../../interfaces/General';
import './TabContent.style.scss';

interface IProps {
  contentList: ITabContentList[];
  handleChangeTab: Function;
}

const TabContent: FC<IProps> = ({ contentList, handleChangeTab }) => {
  return (
    <div className="tab-component">
      <ul className="nav nav-tabs">
        {contentList.map((item) => (
          <li className="nav-item" key={item.id} onClick={handleChangeTab(item.id)}>
            <a className={`nav-link ${item.active ? 'active' : ''}`} href={`#${item.title}`}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {contentList.map((item) => (
          <div key={item.id} className={`tab-pane fade ${item.active ? 'show active' : ''}`}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabContent;
