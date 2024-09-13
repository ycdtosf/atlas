public with sharing class FlowCallout {
    @AuraEnabled
    public static Map<String, Object> callout(String namespace, String flowName, Map<String, Object> inputVariables, List<String> outputVariableNames) {
        
        Flow.Interview theFlow;
        Map<String, Object> outputVariableValues = new Map<String, Object> {
            'flow_callout_success' => true,
            'flow_callout_error' => null
        };

        if(inputVariables == null) inputVariables = new Map<String, Object>();

        try {
            
            if(namespace != null) theFlow = Flow.Interview.createInterview(namespace, flowName, inputVariables);
            else theFlow = Flow.Interview.createInterview(flowName, inputVariables);
            theFlow.start();


            if(outputVariableNames != null) {
                for(String outputVariableName : outputVariableNames) {
                    outputVariableValues.put(outputVariableName, theFlow.getVariableValue(outputVariableName));
                }
            }
    
        } catch (Exception e) {
            outputVariableValues.put('flow_callout_success', false);
            outputVariableValues.put('flow_callout_error', e.getMessage());
        }
        
        return outputVariableValues;

    }

}