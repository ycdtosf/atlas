@isTest
public class FlowCalloutTests {
    @isTest
    public static void test() {

        String input1 = 'ABC';
        String input2 = 'XYZ';

        Map<String, Object> outputs = FlowCallout.callout(
            null, 
            'Flow_Callout_Unit_Test_Flow', 
            new Map<String, Object> {
                'input1' => input1,
                'input2' => input2
            },
            new List<String> {
                'output1',
                'output2',
                'output3'
            }
        );

        system.assertEquals((Boolean)outputs.get('flow_callout_success'), true);
        system.assertEquals((String)outputs.get('output1'), input1);
        system.assertEquals((String)outputs.get('output2'), input2);
        system.assertEquals(outputs.get('output3'), null);
        
    }

    @isTest
    public static void testInvalidNamespace() {

        String input1 = 'ABC';
        String input2 = 'XYZ';

        Map<String, Object> outputs = FlowCallout.callout(
            'INVALID', 
            'Flow_Callout_Unit_Test_Flow', 
            new Map<String, Object> {
                'input1' => input1,
                'input2' => input2
            },
            new List<String> {
                'output1',
                'output2'
            }
        );

        system.assertEquals((Boolean)outputs.get('flow_callout_success'), false);
        system.assertNotEquals((String)outputs.get('flow_callout_error'), null);
        
    }

}