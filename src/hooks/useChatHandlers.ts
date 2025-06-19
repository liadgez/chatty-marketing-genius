import { ChatMode, ChatStep, Message, ActionType } from "./useChatState";

interface UseChatHandlersProps {
  input: string;
  currentMode: ChatMode;
  chatStep: ChatStep;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setChatStep: (step: ChatStep) => void;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  clearInput: () => void;
}

const mockSheets = [
  "Campaign Performance Q4 2024",
  "Customer Acquisition Data",
  "A/B Testing Results",
  "Revenue Analytics Dashboard",
  "Social Media Metrics"
];

export const useChatHandlers = ({
  input,
  currentMode,
  chatStep,
  isLoading,
  setIsLoading,
  setChatStep,
  addMessage,
  clearInput,
}: UseChatHandlersProps) => {

  const handleActionSelect = async (action: ActionType) => {
    if (!currentMode) {
      addMessage({
        type: "assistant",
        content: "Please select a mode first before using quick actions!",
        category: "system"
      });
      return;
    }

    const actionMessages = {
      charts: `🔄 Generating charts and visualizations based on your ${currentMode} mode context...`,
      'draft-email': `✍️ Drafting email content tailored for ${currentMode} purposes...`,
      tables: `📊 Creating data tables relevant to ${currentMode} analysis...`,
      'mind-map': `🧠 Building a mind map for your ${currentMode} strategy...`,
      'action-items': `📋 Extracting actionable items from ${currentMode} insights...`,
      run: `▶️ Executing ${currentMode} analysis workflow...`
    };

    addMessage({
      type: "user",
      content: `Quick Action: ${action.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      category: "action"
    });

    setIsLoading(true);
    setChatStep({ step: "action-processing", data: { action } });

    setTimeout(() => {
      processActionRequest(action);
    }, 1500);
  };

  const processActionRequest = (action: ActionType) => {
    const responses = {
      charts: `📈 **Chart Analysis Complete**\n\n🎯 Generated 3 key visualizations:\n• Performance Trend Chart (23% growth)\n• Conversion Funnel Analysis\n• ROI Comparison by Channel\n\n**Key Insights:**\n• Mobile traffic shows highest conversion\n• Q4 performance exceeded targets\n• Social media ROI improved 40%\n\nWould you like me to dive deeper into any specific chart?`,
      
      'draft-email': `📧 **Email Draft Ready**\n\n**Subject:** Marketing Performance Update - Strong Q4 Results\n\n**Draft Preview:**\n"Hi [Team],\n\nI'm excited to share our Q4 marketing performance highlights:\n\n✅ 23% growth in conversions\n✅ 40% improvement in social media ROI\n✅ Mobile optimization driving results\n\nNext quarter focus: Desktop experience optimization.."\n\n**Tone:** Professional, Data-driven\n**CTA:** Schedule strategy meeting\n\nShall I refine any section?`,
      
      tables: `📊 **Data Tables Generated**\n\n**Table 1: Channel Performance**\n| Channel | Conversions | ROI | Change |\n|---------|-------------|-----|--------|\n| Social  | 1,234       | 4.2x| +40%   |\n| Email   | 987         | 3.8x| +15%   |\n| Search  | 2,156       | 5.1x| +23%   |\n\n**Table 2: Mobile vs Desktop**\n| Device  | Conv Rate | Revenue |\n|---------|-----------|----------|\n| Mobile  | 34%       | $45,230 |\n| Desktop | 28%       | $38,910 |\n\nNeed additional breakdowns?`,
      
      'mind-map': `🧠 **Strategic Mind Map Created**\n\n**Central Theme: Q4 Marketing Success**\n\n🌟 **Performance Branch**\n├── 23% Growth\n├── Mobile Excellence\n└── ROI Improvements\n\n🎯 **Opportunities Branch**\n├── Desktop Optimization\n├── New Channel Testing\n└── Automation Scaling\n\n🚀 **Next Actions Branch**\n├── A/B Test Desktop UX\n├── Expand Social Strategy\n└── Team Training Plan\n\nWant me to expand any branch?`,
      
      'action-items': `📋 **Action Items Extracted**\n\n**High Priority:**\n🔴 Optimize desktop user experience (Target: +15% conversion)\n🔴 Scale successful social media campaigns\n🔴 A/B test mobile-first design elements\n\n**Medium Priority:**\n🟡 Analyze competitor desktop strategies\n🟡 Create mobile optimization playbook\n🟡 Schedule team training on new tools\n\n**Low Priority:**\n🟢 Document Q4 success factors\n🟢 Plan Q1 budget allocation\n\n**Assignments needed?**`,
      
      run: `▶️ **Analysis Execution Complete**\n\n**Workflow Results:**\n✅ Data validation passed\n✅ Performance metrics calculated\n✅ Insights generated\n✅ Recommendations compiled\n\n**Key Findings:**\n• Strong mobile performance trend\n• Desktop optimization opportunity\n• Social media strategy working\n• Ready for Q1 scaling\n\n**Next Steps:**\n1. Review detailed findings\n2. Prioritize action items\n3. Schedule implementation\n\nExecute next workflow phase?`
    };

    addMessage({
      type: "assistant",
      content: responses[action],
      category: "action"
    });
    
    setChatStep({ step: "idle" });
    setIsLoading(false);
  };

  const handleModeSelection = (mode: ChatMode) => {
    const modeMessages = {
      analysis: "Perfect! I'm now in Analysis Mode. I can help you discover and analyze your data sheets. What would you like to analyze?",
      creative: "Great! I'm now in Creative Mode. I can help you brainstorm ideas, create compelling content, and think outside the box. What creative challenge are you working on?",
      strategy: "Excellent! I'm now in Strategy Mode. I can help you develop strategic recommendations, plan campaigns, and optimize your marketing approach. What strategic question do you have?"
    };

    if (mode) {
      addMessage({
        type: "assistant",
        content: modeMessages[mode],
        category: mode === "analysis" ? "system" : "general"
      });
      setChatStep({ step: "idle" });
    }
  };

  const processAnalysisMode = async (userInput: string) => {
    if (chatStep.step === "idle") {
      // Start sheet discovery
      setChatStep({ step: "sheet-discovery" });
      
      setTimeout(() => {
        addMessage({
          type: "assistant",
          content: `I found ${mockSheets.length} data sheets that might be relevant to your query. Here are your options:\n\n${mockSheets.map((sheet, i) => `${i + 1}. ${sheet}`).join('\n')}\n\nPlease type the number of the sheet you'd like to analyze, or ask me to search for something specific.`,
          category: "system"
        });
        setChatStep({ step: "sheet-selection", data: { sheets: mockSheets } });
        setIsLoading(false);
      }, 1500);
    } else if (chatStep.step === "sheet-selection") {
      const sheetIndex = parseInt(userInput) - 1;
      if (sheetIndex >= 0 && sheetIndex < mockSheets.length) {
        const selectedSheet = mockSheets[sheetIndex];
        setChatStep({ step: "data-search", data: { selectedSheet } });
        
        setTimeout(() => {
          addMessage({
            type: "assistant",
            content: `Analyzing "${selectedSheet}"...\n\n📊 Key Insights Found:\n• Performance trend: +23% improvement over last period\n• Top performing segment: Mobile users (34% conversion rate)\n• Optimization opportunity: Desktop experience needs attention\n• Recommended action: A/B test new mobile-first design\n\nWould you like me to dive deeper into any of these insights?`,
            category: "task"
          });
          setChatStep({ step: "idle" });
          setIsLoading(false);
        }, 2000);
      } else {
        addMessage({
          type: "assistant",
          content: "Please enter a valid sheet number (1-5) or describe what you're looking for.",
          category: "system"
        });
        setIsLoading(false);
      }
    }
  };

  const processCreativeMode = async () => {
    setTimeout(() => {
      const creativeResponses = [
        "Here are some creative ideas based on your request:\n\n💡 **Concept 1**: Interactive story-driven campaign\n💡 **Concept 2**: User-generated content challenge\n💡 **Concept 3**: Gamified experience with rewards\n\nWhich direction interests you most?",
        "I love the creative challenge! Here's what I'm thinking:\n\n🎨 **Visual Approach**: Bold, contrasting colors with minimalist design\n📝 **Messaging**: Emotional storytelling that resonates with your audience\n🚀 **Execution**: Multi-platform campaign with consistent branding\n\nShall we develop one of these further?",
        "Creative spark incoming! 🌟\n\n✨ **Innovation**: Try a reverse psychology approach\n✨ **Engagement**: Create a 'behind the scenes' series\n✨ **Impact**: Partner with micro-influencers in your niche\n\nWhat resonates with your brand vision?"
      ];
      
      const randomResponse = creativeResponses[Math.floor(Math.random() * creativeResponses.length)];
      addMessage({
        type: "assistant",
        content: randomResponse,
        category: "general"
      });
      setIsLoading(false);
    }, 1200);
  };

  const processStrategyMode = async () => {
    setTimeout(() => {
      const strategyResponses = [
        "Strategic Analysis Complete 📈\n\n🎯 **Market Position**: You're well-positioned but have room to grow\n📊 **Opportunity**: Untapped audience segment identified\n💼 **Recommendation**: Focus on customer lifetime value optimization\n\n**Next Steps**:\n1. Audit current customer journey\n2. Implement retention strategies\n3. Test new acquisition channels",
        "Here's your strategic roadmap:\n\n🚀 **Phase 1**: Optimize existing funnels (30 days)\n📈 **Phase 2**: Expand to new channels (60 days)\n🎯 **Phase 3**: Scale successful campaigns (90 days)\n\n**Success Metrics**: 25% increase in ROAS, 40% improvement in retention\n\nWhich phase would you like to plan in detail?",
        "Strategic Recommendation Engine Activated 🧠\n\n**Current State Analysis**:\n• Strong brand recognition ✅\n• Conversion optimization needed ⚠️\n• Competitor gap opportunity 🎯\n\n**Strategic Priority**: Focus on mid-funnel optimization to improve conversion rates by 35%\n\nWant me to create a detailed action plan?"
      ];
      
      const randomResponse = strategyResponses[Math.floor(Math.random() * strategyResponses.length)];
      addMessage({
        type: "assistant",
        content: randomResponse,
        category: "task"
      });
      setIsLoading(false);
    }, 1800);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    if (!currentMode) {
      addMessage({
        type: "user",
        content: input,
      });
      addMessage({
        type: "assistant",
        content: "Please select a mode first using the buttons above, then I can help you with your request!",
        category: "system"
      });
      clearInput();
      return;
    }

    // Add user message
    addMessage({
      type: "user",
      content: input,
    });

    setIsLoading(true);
    clearInput();

    // Process based on current mode
    if (currentMode === "analysis") {
      await processAnalysisMode(input);
    } else if (currentMode === "creative") {
      await processCreativeMode();
    } else if (currentMode === "strategy") {
      await processStrategyMode();
    }
  };

  return {
    handleSendMessage,
    handleModeSelection,
    handleActionSelect,
  };
};
