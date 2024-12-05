import React from 'react';
import { Brain, AlertTriangle, TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Lead } from '../../types';

interface AIInsightsSummaryProps {
  leads: Lead[];
}

export function AIInsightsSummary({ leads }: AIInsightsSummaryProps) {
  const calculateInsights = () => {
    const today = new Date();
    const noFollowUp = leads.filter(lead => 
      new Date(lead.next_followup) < today
    ).length;

    const highValueLeads = leads.filter(lead => 
      lead.budget && lead.budget >= 500000
    ).length;

    const recentContacts = leads.filter(lead => {
      const lastContact = new Date(lead.last_contact);
      const diffDays = Math.floor((today.getTime() - lastContact.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length;

    const qualifiedRate = (leads.filter(lead => 
      lead.status === 'qualified' || lead.status === 'proposal'
    ).length / leads.length) * 100;

    return { noFollowUp, highValueLeads, recentContacts, qualifiedRate };
  };

  const insights = calculateInsights();

  const cards = [
    {
      title: 'Overdue Follow-ups',
      value: insights.noFollowUp,
      description: 'Leads requiring immediate attention',
      icon: Calendar,
      color: 'red'
    },
    {
      title: 'High-Value Opportunities',
      value: insights.highValueLeads,
      description: 'Leads with budget >$500k',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Recent Engagement',
      value: insights.recentContacts,
      description: 'Leads contacted in last 7 days',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Qualification Rate',
      value: `${Math.round(insights.qualifiedRate)}%`,
      description: 'Leads reaching qualified stage',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-purple-500" />
        <h2 className="text-lg font-semibold">AI Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg bg-${card.color}-50 border border-${card.color}-100`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${card.color}-100`}>
                <card.icon className={`w-5 h-5 text-${card.color}-600`} />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-gray-900">{card.value}</h3>
                  <p className="text-sm text-gray-500">{card.title}</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{card.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium text-purple-900">Recommended Actions</h3>
        </div>
        <ul className="space-y-2 text-sm text-purple-800">
          {insights.noFollowUp > 0 && (
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Schedule follow-ups for {insights.noFollowUp} overdue leads
            </li>
          )}
          {insights.highValueLeads > 0 && (
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Prioritize engagement with {insights.highValueLeads} high-value opportunities
            </li>
          )}
          {insights.qualifiedRate < 50 && (
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Review qualification process to improve conversion rate
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}