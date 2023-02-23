import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem.js'


export default function InterviewerList(props){


  const interviewersListData = props.interviewers.map((interviewer) =>{
    return (
      <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={props.onChange}    
    />
  )
  })

  return(
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list" >{interviewersListData}</ul>
</section>
  )
}