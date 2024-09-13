public with sharing class FlowCallout {
    @AuraEnabled
    public static Map<String, Object> callout(String namespace, String flowName, Map<String, Object> inputVariables, List<String> outputVariableNames) {
        
        Flow.Interview theFlow;

        if(inputVariables == null) inputVariables = new Map<String, Object>();

        try {
            
            if(namespace != null) theFlow = Flow.Interview.createInterview(namespace, flowName, inputVariables);
            else theFlow = Flow.Interview.createInterview(flowName, inputVariables);
            theFlow.start();

            Map<String, Object> outputVariables = new Map<String, Object>();

            if(outputVariableNames != null) {
                for(String outputVariableName : outputVariableNames) {
                    outputVariables.put(outputVariableName, theFlow.getVariableValue(outputVariableName));
                }
            }
    
            return outputVariables;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }

}