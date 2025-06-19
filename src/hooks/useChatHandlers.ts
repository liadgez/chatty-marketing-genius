
import { ChatMode, ChatStep, Message } from "./useChatState";

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

  const handleModeSelection = (mode: ChatMode) => {
    const modeMessages = {
      analysis: "Perfect! I'm now in Analysis Mode. I can help you discover and analyze your data sheets. What would you like to analyze?",
      creative: "Great! I'm now in Creative Mode. I can help you brainstorm ideas, create compelling content, and think outside the box. What creative challenge are you working on?",
      strategy: "Excellent! I'm now in Strategy Mode. I can help you develop strategic recommendations, plan campaigns, and optimize your marketing approach. What strategic question do you have?",
      plan: "Perfect! I'm now in Plan Mode. I can help you create detailed project plans, roadmaps, and structured approaches to your marketing goals. What would you like to plan?",
      execute: "Great! I'm now in Execute Mode. I can help you implement strategies, execute campaigns, and take action on your marketing initiatives. What would you like to execute?"
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

  const processPlanMode = async () => {
    setTimeout(() => {
      const planResponses = [
        "📋 **Comprehensive Plan Generated**\n\n**Phase 1: Research & Discovery (Week 1-2)**\n• Market analysis\n• Competitor research\n• Audience segmentation\n\n**Phase 2: Strategy Development (Week 3-4)**\n• Campaign messaging\n• Channel selection\n• Budget allocation\n\n**Phase 3: Implementation (Week 5-8)**\n• Content creation\n• Campaign launch\n• Performance monitoring\n\n**Deliverables**: Strategy document, creative assets, performance dashboard\n\nShould I elaborate on any specific phase?",
        "🎯 **Project Roadmap Created**\n\n**Objective**: Increase brand awareness by 40%\n\n**Timeline**: 12 weeks\n\n**Key Milestones**:\n✅ Week 2: Brand audit complete\n✅ Week 4: Creative concepts approved\n✅ Week 6: Campaign launch\n✅ Week 8: Mid-campaign optimization\n✅ Week 12: Final results & reporting\n\n**Resources Needed**: Design team, ad budget, analytics tools\n\nWant me to break down the weekly tasks?",
        "📊 **Strategic Plan Framework**\n\n**1. Goal Definition**\n• Primary: Lead generation\n• Secondary: Brand awareness\n• KPIs: 500 qualified leads/month\n\n**2. Target Audience**\n• B2B decision makers\n• 35-55 years old\n• Mid to large companies\n\n**3. Channel Strategy**\n• LinkedIn advertising (40%)\n• Content marketing (30%)\n• Email campaigns (30%)\n\n**4. Budget**: $15,000/month\n\nReady to dive into implementation details?"
      ];
      
      const randomResponse = planResponses[Math.floor(Math.random() * planResponses.length)];
      addMessage({
        type: "assistant",
        content: randomResponse,
        category: "task"
      });
      setIsLoading(false);
    }, 1600);
  };

  const processExecuteMode = async () => {
    setTimeout(() => {
      const executeResponses = [
        "🚀 **Execution Mode Activated**\n\n**Immediate Actions**:\n✅ Campaign setup initiated\n✅ Creative assets prepared\n✅ Tracking pixels installed\n✅ Landing page optimized\n\n**Next 24 Hours**:\n• Launch first ad set\n• Monitor initial performance\n• A/B test headlines\n\n**Status**: Ready to deploy\n\nShall I proceed with the campaign launch?",
        "⚡ **Implementation In Progress**\n\n**Current Tasks**:\n🔄 Setting up Google Ads campaign\n🔄 Configuring Facebook pixel\n🔄 Creating email sequences\n\n**Completed**:\n✅ Landing page live\n✅ Analytics tracking active\n✅ Lead magnet uploaded\n\n**ETA**: 2 hours until full deployment\n\nNeed me to prioritize any specific component?",
        "🎬 **Campaign Execution Dashboard**\n\n**Live Status**:\n• Ad spend: $247.50 (today)\n• Impressions: 12,450\n• Clicks: 186 (CTR: 1.49%)\n• Conversions: 8 (4.3% rate)\n\n**Active Optimizations**:\n🔧 Adjusting bid strategy\n🔧 Pausing low-performing ads\n🔧 Scaling winning creative\n\n**Recommendation**: Increase budget by 20% on top performer\n\nApprove the budget increase?"
      ];
      
      const randomResponse = executeResponses[Math.floor(Math.random() * executeResponses.length)];
      addMessage({
        type: "assistant",
        content: randomResponse,
        category: "task"
      });
      setIsLoading(false);
    }, 1400);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    if (!currentMode && chatStep.step === "mode-selection") {
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
    } else if (currentMode === "plan") {
      await processPlanMode();
    } else if (currentMode === "execute") {
      await processExecuteMode();
    }
  };

  return {
    handleSendMessage,
    handleModeSelection,
  };
};
