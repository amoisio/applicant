import React, { useEffect, useRef, useState } from 'react';
import TemplateEditor from './TemplateEditor';
import ViewTitle from '../shared/ViewTitle';
import Template from '../../models/template';
import './TemplateView.css';

/**
 * Template view component manages template state.
 * @param {string} title Template view title.
 * @param {object} repository Template repository.
 */
export default function TemplateView({ title, repository }) {
  if (!repository) throw new Error('repository must be given.');

  const [template, setTemplate] = useState(undefined);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!template) {
      // Load template into local state
      const hasTemplate = repository.hasTemplate();
      const currentTemplate = hasTemplate
        ? repository.getTemplate()
        : Template.create();
      setTemplate(currentTemplate);
      return;
    } 
    
    if (initialRender.current) {
      // This prevents a redundant save once the template has been loaded
      initialRender.current = false;
    } else {
      // For subsequent template changes, save the template
      repository.addOrUpdateTemplate(template);
    }
  }, [repository, template]);

  return (
    <main className='template'>
      <ViewTitle>{title ?? 'Template questions'}</ViewTitle>
      {template && <TemplateEditor
        template={template}
        onChange={setTemplate} />}
    </main>
  );
}
