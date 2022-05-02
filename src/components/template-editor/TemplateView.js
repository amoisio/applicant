import React, { useEffect, useRef, useState } from 'react';
import TemplateEditor from './TemplateEditor';
import ViewTitle from '../shared/ViewTitle';
import './TemplateView.css';
import Template from '../../models/template';

/**
 * Template view component manages template state.
 * @param {string} title Template view title.
 * @param {object} templateRepository Template repository.
 */
export default function TemplateView({ title, templateRepository }) {
  if (!templateRepository) throw new Error('templateRepository must be given.');

  const [template, setTemplate] = useState(undefined);
  const initialRender = useRef(true);

  useEffect(() => {
    if (!template) {
      // Load template into local state
      const hasTemplate = templateRepository.hasTemplate();
      const currentTemplate = hasTemplate
        ? templateRepository.getTemplate()
        : Template.create();
      setTemplate(currentTemplate);
    } else if (initialRender.current) {
      // This prevents a redundant save once the template has been loaded
      initialRender.current = false;
    } else {
      // For subsequent template changes, save the template
      templateRepository.addOrUpdateTemplate(template);
    }
  }, [templateRepository, template]);

  return (
    <main className='template'>
      <ViewTitle>{title ?? 'Template questions'}</ViewTitle>
      {template && <TemplateEditor
        template={template}
        onChange={setTemplate} />}
    </main>
  );
}
