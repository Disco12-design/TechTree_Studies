'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface Section {
  heading: string;
  explain: string;
  points: string[];
  remember: string;
  examTip: string;
}

interface GlossaryItem {
  term: string;
  meaning: string;
}

interface NoteFormData {
  title: string;
  domain: string;
  module: string;
  moduleName: string;
  description: string;
  estimatedTime: string;
  sections: Section[];
  quickReview: string[];
  glossary: GlossaryItem[];
}

export default function CreateNote() {
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    domain: '',
    module: '',
    moduleName: '',
    description: '',
    estimatedTime: '',
    sections: [{ heading: '', explain: '', points: [''], remember: '', examTip: '' }],
    quickReview: [''],
    glossary: [{ term: '', meaning: '' }],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (index: number, field: string, value: any) => {
    const newSections = [...formData.sections];
    (newSections[index] as any)[field] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const handlePointChange = (sectionIndex: number, pointIndex: number, value: string) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].points[pointIndex] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addPoint = (sectionIndex: number) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].points.push('');
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const removePoint = (sectionIndex: number, pointIndex: number) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].points.splice(pointIndex, 1);
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { heading: '', explain: '', points: [''], remember: '', examTip: '' }]
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const handleQuickReviewChange = (index: number, value: string) => {
    const newReview = [...formData.quickReview];
    newReview[index] = value;
    setFormData(prev => ({ ...prev, quickReview: newReview }));
  };

  const addQuickReview = () => {
    setFormData(prev => ({ ...prev, quickReview: [...prev.quickReview, ''] }));
  };

  const removeQuickReview = (index: number) => {
    setFormData(prev => ({
      ...prev,
      quickReview: prev.quickReview.filter((_, i) => i !== index)
    }));
  };

  const handleGlossaryChange = (index: number, field: 'term' | 'meaning', value: string) => {
    const newGlossary = [...formData.glossary];
    newGlossary[index][field] = value;
    setFormData(prev => ({ ...prev, glossary: newGlossary }));
  };

  const addGlossary = () => {
    setFormData(prev => ({ ...prev, glossary: [...prev.glossary, { term: '', meaning: '' }] }));
  };

  const removeGlossary = (index: number) => {
    setFormData(prev => ({
      ...prev,
      glossary: prev.glossary.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Study Note Created:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        domain: '',
        module: '',
        moduleName: '',
        description: '',
        estimatedTime: '',
        sections: [{ heading: '', explain: '', points: [''], remember: '', examTip: '' }],
        quickReview: [''],
        glossary: [{ term: '', meaning: '' }],
      });
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-brand-50">
      {/* Header */}
      <header className="border-b border-brand-200 bg-white sticky top-0 z-10">
        <div className="px-8 py-6">
          <Link href="/study-notes" className="text-brand-600 hover:text-brand-900 mb-4 inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Study Notes
          </Link>
          <h1 className="text-3xl font-bold text-brand-900">Create New Study Note</h1>
          <p className="text-brand-600 mt-1">Add comprehensive study materials with sections, quick review, and glossary</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-8 py-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-lg border border-brand-200">
            <h2 className="text-xl font-bold text-brand-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  placeholder="e.g., Vulnerability Discovery and Scanning"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-2">Domain</label>
                  <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    placeholder="e.g., Domain 2.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-2">Module</label>
                  <input
                    type="text"
                    name="module"
                    value={formData.module}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    placeholder="e.g., 2.1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-2">Module Name</label>
                <input
                  type="text"
                  name="moduleName"
                  value={formData.moduleName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  placeholder="e.g., Vulnerability Discovery"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  placeholder="Brief description of the study note..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-2">Estimated Time</label>
                <input
                  type="text"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  placeholder="e.g., 4 hours"
                />
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="bg-white p-6 rounded-lg border border-brand-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-900">Sections</h2>
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                Add Section
              </button>
            </div>

            {formData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6 p-4 border border-brand-100 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-brand-900">Section {sectionIndex + 1}</h3>
                  {formData.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => handleSectionChange(sectionIndex, 'heading', e.target.value)}
                    placeholder="Section Heading"
                    className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />

                  <textarea
                    value={section.explain}
                    onChange={(e) => handleSectionChange(sectionIndex, 'explain', e.target.value)}
                    placeholder="Explanation"
                    rows={2}
                    className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />

                  <div>
                    <label className="block text-sm font-semibold text-brand-900 mb-2">Points</label>
                    {section.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex gap-2 mb-2">
                        <textarea
                          value={point}
                          onChange={(e) => handlePointChange(sectionIndex, pointIndex, e.target.value)}
                          placeholder="Key point..."
                          rows={2}
                          className="flex-1 px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                        />
                        {section.points.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePoint(sectionIndex, pointIndex)}
                            className="text-red-600 hover:text-red-900 mt-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addPoint(sectionIndex)}
                      className="text-sm text-brand-600 hover:text-brand-900 mt-2"
                    >
                      + Add Point
                    </button>
                  </div>

                  <textarea
                    value={section.remember}
                    onChange={(e) => handleSectionChange(sectionIndex, 'remember', e.target.value)}
                    placeholder="Remember: Memory aid or key takeaway"
                    rows={2}
                    className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />

                  <textarea
                    value={section.examTip}
                    onChange={(e) => handleSectionChange(sectionIndex, 'examTip', e.target.value)}
                    placeholder="Exam Tip: How this appears on the exam"
                    rows={2}
                    className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Review */}
          <div className="bg-white p-6 rounded-lg border border-brand-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-900">Quick Review</h2>
              <button
                type="button"
                onClick={addQuickReview}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                Add Item
              </button>
            </div>

            {formData.quickReview.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <textarea
                  value={item}
                  onChange={(e) => handleQuickReviewChange(index, e.target.value)}
                  placeholder="Quick review point..."
                  rows={2}
                  className="flex-1 px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                />
                {formData.quickReview.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuickReview(index)}
                    className="text-red-600 hover:text-red-900 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Glossary */}
          <div className="bg-white p-6 rounded-lg border border-brand-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-900">Glossary</h2>
              <button
                type="button"
                onClick={addGlossary}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={18} />
                Add Term
              </button>
            </div>

            {formData.glossary.map((item, index) => (
              <div key={index} className="mb-4 p-4 border border-brand-100 rounded-lg">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.term}
                      onChange={(e) => handleGlossaryChange(index, 'term', e.target.value)}
                      placeholder="Term"
                      className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 mb-2"
                    />
                    <textarea
                      value={item.meaning}
                      onChange={(e) => handleGlossaryChange(index, 'meaning', e.target.value)}
                      placeholder="Definition"
                      rows={2}
                      className="w-full px-4 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    />
                  </div>
                  {formData.glossary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGlossary(index)}
                      className="text-red-600 hover:text-red-900 mt-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Create Study Note
            </button>
            <Link
              href="/study-notes"
              className="px-6 py-3 border border-brand-200 text-brand-900 hover:bg-brand-50 rounded-lg transition"
            >
              Cancel
            </Link>
          </div>

          {submitted && (
            <div className="p-4 bg-green-100 border border-green-300 text-green-900 rounded-lg">
              ✓ Study note created successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}